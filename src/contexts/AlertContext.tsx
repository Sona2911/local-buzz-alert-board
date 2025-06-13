
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface AlertContextType {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp' | 'upvotes' | 'status'>) => void;
  updateFilters: (filters: any) => void;
  filteredAlerts: Alert[];
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Mock data for initial display
const mockAlerts: Alert[] = [
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

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(mockAlerts);

  const addAlert = (newAlert: Omit<Alert, 'id' | 'timestamp' | 'upvotes' | 'status'>) => {
    const alert: Alert = {
      ...newAlert,
      id: Date.now().toString(),
      timestamp: new Date(),
      upvotes: 0,
      status: 'active'
    };
    
    const updatedAlerts = [alert, ...alerts];
    setAlerts(updatedAlerts);
    setFilteredAlerts(updatedAlerts);
  };

  const updateFilters = (filters: any) => {
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
    <AlertContext.Provider value={{ alerts, addAlert, updateFilters, filteredAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};
