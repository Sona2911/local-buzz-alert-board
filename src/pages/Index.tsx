
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertBoard } from "@/components/AlertBoard";
import { MapView } from "@/components/MapView";
import { AlertSubmission } from "@/components/AlertSubmission";
import { Header } from "@/components/Header";

const Index = () => {
  const [activeTab, setActiveTab] = useState("board");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger 
              value="board" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              📋 Alert Board
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              🗺️ Map View
            </TabsTrigger>
            <TabsTrigger 
              value="submit" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              ➕ Submit Alert
            </TabsTrigger>
          </TabsList>

          <TabsContent value="board" className="space-y-4">
            <AlertBoard />
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <MapView />
          </TabsContent>

          <TabsContent value="submit" className="space-y-4">
            <AlertSubmission />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
