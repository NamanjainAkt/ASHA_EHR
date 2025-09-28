"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from 'next-intl';
import { useAppStore } from '@/store/use-app-store';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Phone, MapPin, Calendar } from "lucide-react";
import { Patient } from "@/lib/types";
import { PatientProfileModal } from "@/components/patients/patient-profile-modal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const t = useTranslations('Patients');
  const { openPatientProfileModal } = useAppStore();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  // Mobile card component for each patient
  const PatientCard = ({ patient }: { patient: Patient }) => {
    const formatDate = (dateString: string) => {
      return new Intl.DateTimeFormat('en-IN').format(new Date(dateString));
    };

    const handleCardClick = () => {
      openPatientProfileModal(patient);
    };

    const handleMenuClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click when clicking menu
    };

    return (
      <Card 
        className="mb-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-health-blue/30 hover:bg-health-blue/5" 
        onClick={handleCardClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="font-semibold text-lg hover:text-health-indigo transition-colors">{patient.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {patient.village}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={patient.status === 'Active' ? 'secondary' : 'destructive'}
                className="text-xs"
              >
                {t(patient.status.toLowerCase())}
              </Badge>
              <div onClick={handleMenuClick}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-health-teal/10">
                      <span className="sr-only">{t('actions')}</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(patient.id);
                      }}
                    >
                      {t('copyPatientId')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => openPatientProfileModal(patient)}>{t('viewProfile')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('editDetails')}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <span className="font-medium w-16">Age:</span>
              <span>{patient.age}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-16">Gender:</span>
              <span>{patient.gender}</span>
            </div>
            <div className="flex items-center col-span-2">
              <Phone className="h-3 w-3 mr-2" />
              <span className="font-medium mr-2">Contact:</span>
              <span>{patient.contact}</span>
            </div>
            <div className="flex items-center col-span-2">
              <Calendar className="h-3 w-3 mr-2" />
              <span className="font-medium mr-2">Last Visit:</span>
              <span>{formatDate(patient.lastVisit)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <PatientProfileModal />
      <div className="flex items-center">
        <Input
          placeholder={t('filterByName')}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      
      {/* Mobile view - Card layout */}
      <div className="md:hidden">
        {table.getRowModel().rows?.length ? (
          <div className="space-y-3">
            {table.getRowModel().rows.map((row) => (
              <PatientCard key={row.id} patient={row.original as Patient} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-24">
              <p className="text-muted-foreground">{t('noResults')}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Desktop view - Table layout */}
      <div className="hidden md:block">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer hover:bg-health-blue/5 transition-colors"
                    onClick={() => openPatientProfileModal(row.original as Patient)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {t('noResults')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
        <div className="text-sm text-muted-foreground order-2 sm:order-1">
          {table.getFilteredSelectedRowModel().rows.length} {t('of')}{" "}
          {table.getFilteredRowModel().rows.length} {t('rows')} {t('selected')}.
        </div>
        <div className="flex items-center space-x-2 order-1 sm:order-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t('previous')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t('next')}
          </Button>
        </div>
      </div>
    </div>
  );
}
