
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Calendar, ChevronUp } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  timestamp: Date;
  status: string;
  severity: string;
  upvotes: number;
}

interface AlertCardProps {
  alert: Alert;
}

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

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    safety: "bg-red-100 text-red-800 border-red-200",
    utilities: "bg-yellow-100 text-yellow-800 border-yellow-200",
    traffic: "bg-orange-100 text-orange-800 border-orange-200",
    animals: "bg-green-100 text-green-800 border-green-200", 
    weather: "bg-blue-100 text-blue-800 border-blue-200",
    community: "bg-purple-100 text-purple-800 border-purple-200",
    other: "bg-gray-100 text-gray-800 border-gray-200"
  };
  return colors[category] || colors.other;
};

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    high: "bg-red-500",
    medium: "bg-yellow-500", 
    low: "bg-green-500"
  };
  return colors[severity] || colors.low;
};

export const AlertCard = ({ alert }: AlertCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="text-2xl mt-1">
              {getCategoryIcon(alert.category)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg leading-tight mb-2">
                {alert.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge 
                  variant="outline" 
                  className={getCategoryColor(alert.category)}
                >
                  {alert.category}
                </Badge>
                <div 
                  className={`w-2 h-2 rounded-full ${getSeverityColor(alert.severity)}`}
                  title={`${alert.severity} priority`}
                />
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
          >
            <ChevronUp className="h-4 w-4" />
            {alert.upvotes}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {alert.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {alert.location}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
