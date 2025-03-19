import React, { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar"; // Added the missing Calendar import
import { 
  MoreHorizontal, Search, Filter, ChevronDown, Download 
} from "lucide-react";

const CustomerManager = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", signupDate: "2023-01-15", orders: 5, status: "active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", signupDate: "2023-02-20", orders: 3, status: "inactive" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", signupDate: "2023-03-10", orders: 8, status: "active" },
    { id: 4, name: "Bob Williams", email: "bob.williams@example.com", signupDate: "2023-04-01", orders: 2, status: "pending" },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <Button>Add Customer</Button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <Input placeholder="Search customers..." className="md:w-1/3" />
        <Button variant="outline">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Signup Date</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.signupDate}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>{customer.status}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerManager;
