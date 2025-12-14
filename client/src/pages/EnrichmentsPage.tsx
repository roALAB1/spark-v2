import { useState } from "react";
import { Search, Plus, Database, TrendingUp, Users, X, Filter, Calendar, Clock, CheckCircle2, Pause, Play, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface Enrichment {
  id: string;
  name: string;
  type: "contact" | "company" | "demographic";
  status: "active" | "pending" | "completed";
  recordsProcessed: number;
  totalRecords: number;
  createdAt: string;
}

// Mock data for demonstration
const mockEnrichments: Enrichment[] = [
  {
    id: "1",
    name: "Q4 Lead Enrichment",
    type: "contact",
    status: "active",
    recordsProcessed: 1247,
    totalRecords: 2500,
    createdAt: "2025-12-10",
  },
  {
    id: "2",
    name: "Enterprise Accounts",
    type: "company",
    status: "completed",
    recordsProcessed: 850,
    totalRecords: 850,
    createdAt: "2025-12-08",
  },
  {
    id: "3",
    name: "Email Verification Batch",
    type: "contact",
    status: "pending",
    recordsProcessed: 0,
    totalRecords: 3200,
    createdAt: "2025-12-13",
  },
];

// Mock activity logs
const mockLogs = [
  { time: "2025-12-13 14:30", message: "Enrichment job started", type: "info" },
  { time: "2025-12-13 14:32", message: "Processing batch 1 of 10", type: "info" },
  { time: "2025-12-13 14:35", message: "500 records enriched successfully", type: "success" },
  { time: "2025-12-13 14:40", message: "Processing batch 2 of 10", type: "info" },
  { time: "2025-12-13 14:42", message: "Rate limit encountered, retrying...", type: "warning" },
];

const enrichmentTypeIcons = {
  contact: Users,
  company: Database,
  demographic: TrendingUp,
};

const statusColors = {
  active: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  completed: "bg-green-500/10 text-green-600 border-green-500/20",
};

type StatusFilter = "all" | "active" | "pending" | "completed";
type TypeFilter = "all" | "contact" | "company" | "demographic";

export default function EnrichmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [enrichments] = useState<Enrichment[]>(mockEnrichments);
  const [selectedEnrichment, setSelectedEnrichment] = useState<Enrichment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter enrichments
  const filteredEnrichments = enrichments.filter((enrichment) => {
    const matchesSearch = enrichment.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || enrichment.status === statusFilter;
    const matchesType = typeFilter === "all" || enrichment.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Check if any filters are active
  const hasActiveFilters = searchQuery !== "" || statusFilter !== "all" || typeFilter !== "all";

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
  };

  // Calculate stats
  const totalEnrichments = enrichments.length;
  const activeJobs = enrichments.filter((e) => e.status === "active").length;
  const totalRecordsProcessed = enrichments.reduce((sum, e) => sum + e.recordsProcessed, 0);
  const totalRecords = enrichments.reduce((sum, e) => sum + e.totalRecords, 0);
  const successRate = totalRecords > 0 ? Math.round((totalRecordsProcessed / totalRecords) * 100) : 0;

  const handleEnrichmentClick = (enrichment: Enrichment) => {
    setSelectedEnrichment(enrichment);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Enrichments</h1>
                <p className="text-sm text-gray-600">Enhance your data with additional contact and company information</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Enrichment
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-sm text-gray-600 mb-1">Total Enrichments</div>
            <div className="text-3xl font-bold text-gray-900">{totalEnrichments}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-sm text-gray-600 mb-1">Active Jobs</div>
            <div className="text-3xl font-bold text-blue-600">{activeJobs}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-sm text-gray-600 mb-1">Records Processed</div>
            <div className="text-3xl font-bold text-gray-900">{totalRecordsProcessed.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-sm text-gray-600 mb-1">Success Rate</div>
            <div className="text-3xl font-bold text-green-600">{successRate}%</div>
          </div>
        </div>

        {/* Search and Filters Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search enrichments by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filters:</span>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                  className={statusFilter === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  All Status
                </Button>
                <Button
                  variant={statusFilter === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("active")}
                  className={
                    statusFilter === "active"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-blue-500/20 text-blue-600 hover:bg-blue-500/10"
                  }
                >
                  Active
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("pending")}
                  className={
                    statusFilter === "pending"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-yellow-500/20 text-yellow-600 hover:bg-yellow-500/10"
                  }
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("completed")}
                  className={
                    statusFilter === "completed"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-green-500/20 text-green-600 hover:bg-green-500/10"
                  }
                >
                  Completed
                </Button>
              </div>

              {/* Type Filter Dropdown */}
              <Select value={typeFilter} onValueChange={(value: string) => setTypeFilter(value as TypeFilter)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="contact">Contact</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="demographic">Demographic</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </Button>
              )}

              {/* Results Count */}
              <div className="ml-auto text-sm text-gray-600">
                Showing {filteredEnrichments.length} of {enrichments.length} enrichments
              </div>
            </div>
          </div>
        </div>

        {/* Enrichments List */}
        {filteredEnrichments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {hasActiveFilters ? "No enrichments found matching your filters." : "No enrichments yet. Create your first enrichment to get started."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnrichments.map((enrichment) => {
              const progress = (enrichment.recordsProcessed / enrichment.totalRecords) * 100;
              const Icon = enrichmentTypeIcons[enrichment.type];

              return (
                <div
                  key={enrichment.id}
                  onClick={() => handleEnrichmentClick(enrichment)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{enrichment.name}</h3>
                        <p className="text-sm text-gray-600">Created on {new Date(enrichment.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={statusColors[enrichment.status]}>
                      {enrichment.status.charAt(0).toUpperCase() + enrichment.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">
                        {enrichment.recordsProcessed.toLocaleString()} / {enrichment.totalRecords.toLocaleString()} records
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="mt-4">
                    <Badge variant="secondary" className="text-xs">
                      {enrichment.type.charAt(0).toUpperCase() + enrichment.type.slice(1)} Enrichment
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Card */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mt-8">
          <h3 className="font-semibold text-blue-900 mb-2">
            💡 About Enrichments
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Enrich your contact and company data with additional information</li>
            <li>• Track enrichment progress and success rates in real-time</li>
            <li>• Pause, resume, or cancel enrichment jobs at any time</li>
            <li>• Download enriched data when jobs are completed</li>
          </ul>
        </div>
      </main>

      {/* Enrichment Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 text-foreground">
          {selectedEnrichment && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    {(() => {
                      const Icon = enrichmentTypeIcons[selectedEnrichment.type];
                      return <Icon className="w-6 h-6 text-primary" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl">{selectedEnrichment.name}</DialogTitle>
                    <DialogDescription className="mt-2">
                      {selectedEnrichment.type.charAt(0).toUpperCase() + selectedEnrichment.type.slice(1)} enrichment • Created on {new Date(selectedEnrichment.createdAt).toLocaleDateString()}
                    </DialogDescription>
                  </div>
                  <Badge variant="outline" className={statusColors[selectedEnrichment.status]}>
                    {selectedEnrichment.status.charAt(0).toUpperCase() + selectedEnrichment.status.slice(1)}
                  </Badge>
                </div>
              </DialogHeader>

              <Separator className="my-4" />

              {/* Progress Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Progress</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Records Processed</span>
                    <span className="font-medium">
                      {selectedEnrichment.recordsProcessed} / {selectedEnrichment.totalRecords}
                    </span>
                  </div>
                  <Progress value={(selectedEnrichment.recordsProcessed / selectedEnrichment.totalRecords) * 100} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {((selectedEnrichment.recordsProcessed / selectedEnrichment.totalRecords) * 100).toFixed(1)}% complete
                    </span>
                    <span className="text-muted-foreground">
                      Est. {selectedEnrichment.totalRecords - selectedEnrichment.recordsProcessed} remaining
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Details Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Created</div>
                      <div className="text-sm font-medium">
                        {new Date(selectedEnrichment.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                      <div className="text-sm font-medium">
                        {selectedEnrichment.status === "completed" ? "2h 15m" : "1h 45m (ongoing)"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Success Rate</div>
                      <div className="text-sm font-medium">
                        {selectedEnrichment.status === "completed" ? "100%" : "94.2%"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Type</div>
                      <div className="text-sm font-medium capitalize">{selectedEnrichment.type}</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Activity Log */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Activity Log</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 border rounded-lg p-4 bg-muted/30">
                  {mockLogs.map((log, index) => (
                    <div key={index} className="text-sm flex gap-2 hover:bg-muted/50 p-1 rounded">
                      <span className="text-muted-foreground whitespace-nowrap">{log.time}</span>
                      <span className={
                        log.type === "success" ? "text-green-600" :
                        log.type === "warning" ? "text-yellow-600" :
                        "text-foreground"
                      }>
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                {selectedEnrichment.status === "active" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </>
                )}
                {selectedEnrichment.status === "pending" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </>
                )}
                {selectedEnrichment.status === "completed" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Results
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
