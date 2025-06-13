
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

// Mock data for map markers
const mockMapAlerts = [
  {
    id: "1",
    title: "Power Outage",
    category: "utilities",
    lat: 40.7128,
    lng: -74.0060,
    severity: "high"
  },
  {
    id: "2",
    title: "Missing Cat",
    category: "animals", 
    lat: 40.7589,
    lng: -73.9851,
    severity: "medium"
  },
  {
    id: "3",
    title: "Road Closure",
    category: "traffic",
    lat: 40.7505,
    lng: -73.9934,
    severity: "medium"
  }
];

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    safety: "🚨",
    utilities: "⚡",
    traffic: "🚧",
    animals: "🐾", 
    weather: "🌤️",
    community: "🏘️",
    other: "📢"
  };
  return icons[category] || icons.other;
};

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    high: "bg-red-500 border-red-600",
    medium: "bg-yellow-500 border-yellow-600",
    low: "bg-green-500 border-green-600"
  };
  return colors[severity] || colors.low;
};

export const MapView = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          {/* Placeholder for interactive map */}
          <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                <p className="text-gray-600 max-w-sm">
                  Map integration with Mapbox or Google Maps will be added here to show alert locations with interactive pins.
                </p>
              </div>
            </div>
            
            {/* Mock pins positioned on the placeholder */}
            {mockMapAlerts.map((alert, index) => (
              <div
                key={alert.id}
                className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${getSeverityColor(alert.severity)} shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer`}
                style={{
                  left: `${30 + index * 20}%`,
                  top: `${40 + index * 10}%`
                }}
                title={alert.title}
              >
                {getCategoryIcon(alert.category)}
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-white rounded-b-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Map Legend</h3>
              <Badge variant="secondary">
                {mockMapAlerts.length} alerts shown
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border border-red-600"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full border border-yellow-600"></div>
                <span>Medium Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full border border-green-600"></div>
                <span>Low Priority</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert details sidebar */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Nearby Alerts</h3>
          <div className="space-y-3">
            {mockMapAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="text-lg">{getCategoryIcon(alert.category)}</div>
                <div className="flex-1">
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-sm text-gray-500">Click on map pin for details</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`}></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
