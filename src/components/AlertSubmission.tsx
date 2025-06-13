import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Image, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAlerts } from "@/contexts/AlertContext";

interface AlertSubmissionProps {
  onAlertSubmitted: () => void;
}

export const AlertSubmission = ({ onAlertSubmitted }: AlertSubmissionProps) => {
  const { toast } = useToast();
  const { addAlert } = useAlerts();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    severity: "medium"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Add the alert to the global state
    addAlert({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      severity: formData.severity
    });

    toast({
      title: "Alert Submitted!",
      description: "Your alert has been added to the community board.",
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      severity: "medium"
    });

    // Switch to alert board tab
    onAlertSubmitted();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          const coords = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
          handleInputChange("location", `Near ${coords}`);
          toast({
            title: "Location Added",
            description: "Your current location has been added to the alert.",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive"
          });
        }
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Submit New Alert
          </CardTitle>
          <p className="text-sm text-gray-600">
            Help keep your neighbors informed about community issues and events.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Alert Title *</Label>
              <Input
                id="title"
                placeholder="Brief, descriptive title (e.g., 'Power outage on Main St')"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety">🚨 Safety & Security</SelectItem>
                    <SelectItem value="utilities">⚡ Utilities</SelectItem>
                    <SelectItem value="traffic">🚧 Traffic & Roads</SelectItem>
                    <SelectItem value="animals">🐾 Lost/Found Pets</SelectItem>
                    <SelectItem value="weather">🌤️ Weather</SelectItem>
                    <SelectItem value="community">🏘️ Community Events</SelectItem>
                    <SelectItem value="other">📢 Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Priority Level</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) => handleInputChange("severity", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">🔴 High (Urgent/Emergency)</SelectItem>
                    <SelectItem value="medium">🟡 Medium (Important)</SelectItem>
                    <SelectItem value="low">🟢 Low (FYI/Community)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Street address or area description"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={getCurrentLocation}
                  className="shrink-0"
                >
                  <MapPin className="h-4 w-4" />
                  Use Current Location
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide details about the situation, what happened, when it started, etc."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Photo (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload a photo or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG up to 5MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Community Guidelines</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be respectful and factual in your reports</li>
                <li>• For emergencies, call 911 first, then post here</li>
                <li>• Avoid personal conflicts or accusations</li>
                <li>• Include helpful details like time, location, and photos</li>
              </ul>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Submit Alert
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
