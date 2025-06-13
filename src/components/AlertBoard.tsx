
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCard } from "@/components/AlertCard";
import { AlertFilters } from "@/components/AlertFilters";
import { useAlerts } from "@/contexts/AlertContext";

export const AlertBoard = () => {
  const { filteredAlerts, updateFilters } = useAlerts();

  const handleFilterChange = (filters: any) => {
    updateFilters(filters);
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
