
import { Bell } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Neighborhood Alert Board
              </h1>
              <p className="text-sm text-gray-600">
                Stay connected with your community
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
};
