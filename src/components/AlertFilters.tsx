
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AlertFiltersProps {
  onFilterChange: (filters: any) => void;
}

export const AlertFilters = ({ onFilterChange }: AlertFiltersProps) => {
  const [filters, setFilters] = useState({
    category: "all",
    severity: "all", 
    status: "all"
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: "all",
      severity: "all",
      status: "all"
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select
        value={filters.category}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="safety">🚨 Safety</SelectItem>
          <SelectItem value="utilities">⚡ Utilities</SelectItem>
          <SelectItem value="traffic">🚧 Traffic</SelectItem>
          <SelectItem value="animals">🐾 Animals</SelectItem>
          <SelectItem value="weather">🌤️ Weather</SelectItem>
          <SelectItem value="community">🏘️ Community</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.severity}
        onValueChange={(value) => handleFilterChange("severity", value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="high">🔴 High</SelectItem>
          <SelectItem value="medium">🟡 Medium</SelectItem>
          <SelectItem value="low">🟢 Low</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(value) => handleFilterChange("status", value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
          <SelectItem value="under_review">Under Review</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        variant="outline" 
        size="sm"
        onClick={clearFilters}
        className="text-gray-600"
      >
        Clear Filters
      </Button>
    </div>
  );
};
