
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCard } from "@/components/AlertCard";
import { AlertFilters } from "@/components/AlertFilters";

// Mock data for initial display
const mockAlerts = [
  {
    id: "1",
    title: "Power Outage on Maple Street",
    description: "Power has been out for the past 2 hours. Estimated repair time: 4 hours",
    category: "utilities",
    location: "Maple Street, Block 200-300",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "active",
    severity: "high",
    upvotes: 12
  },
  {
    id: "2", 
    title: "Missing Cat - Orange Tabby",
    description: "Missing since yesterday evening. Very friendly, responds to 'Whiskers'. Please call if seen.",
    category: "animals",
    location: "Oak Avenue area",
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    status: "active", 
    severity: "medium",
    upvotes: 8
  },
  {
    id: "3",
    title: "Road Closure - Construction",
    description: "Pine Street will be closed between 1st and 3rd Avenue for water main repair until Friday.",
    category: "traffic",
    location: "Pine Street",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    status: "active",
    severity: "medium", 
    upvotes: 5
  },
  {
    id: "4",
    title: "Community Cleanup Event",
    description: "Join us this Saturday at 9 AM for our monthly neighborhood cleanup. Coffee and donuts provided!",
    category: "community",
    location: "Community Center",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    status: "active",
    severity: "low",
    upvotes: 15
  }
];

export const AlertBoard = () => {
  const [alerts] = useState(mockAlerts);
  const [filteredAlerts, setFilteredAlerts] = useState(mockAlerts);

  const handleFilterChange = (filters: any) => {
    let filtered = alerts;
    
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(alert => alert.category === filters.category);
    }
    
    if (filters.severity && filters.severity !== "all") {
      filtered = filtered.filter(alert => alert.severity === filters.severity);
    }
    
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter(alert => alert.status === filters.status);
    }
    
    setFilteredAlerts(filtered);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Alerts</h2>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {filteredAlerts.length} active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <AlertFilters onFilterChange={handleFilterChange} />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No alerts match your current filters.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => handleFilterChange({})}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        )}
      </div>
    </div>
  );
};
