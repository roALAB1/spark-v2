import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Search, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';
import CreateAudienceDialog from '@/components/audiences/CreateAudienceDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AudiencesPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [audienceToDelete, setAudienceToDelete] = useState<{ id: string; name: string } | null>(null);

  // Fetch audiences
  const { data, isLoading, error, refetch } = trpc.audienceLabAPI.audiences.list.useQuery({
    page,
    pageSize,
  });

  // Delete mutation
  const deleteMutation = trpc.audienceLabAPI.audiences.delete.useMutation({
    onSuccess: () => {
      toast.success('Audience deleted successfully');
      refetch();
      setDeleteDialogOpen(false);
      setAudienceToDelete(null);
    },
    onError: (error: any) => {
      toast.error(`Failed to delete audience: ${error.message}`);
    },
  });

  const handleDelete = (id: string, name: string) => {
    setAudienceToDelete({ id, name });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (audienceToDelete) {
      deleteMutation.mutate({ id: audienceToDelete.id });
    }
  };

  // Filter audiences by search query
  const filteredAudiences = data?.data.filter((audience: any) =>
    audience.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Audiences</h1>
                <p className="text-sm text-gray-600">Manage your audience segments and filters</p>
              </div>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Audience
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search audiences..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Audiences</h3>
            <p className="text-sm text-red-700">{error.message}</p>
          </div>
        )}

        {/* Audiences List */}
        {!isLoading && !error && (
          <>
            {filteredAudiences.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {searchQuery ? 'No audiences found matching your search.' : 'No audiences yet. Create your first audience to get started.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAudiences.map((audience: any) => (
                  <div key={audience.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{audience.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">ID: {audience.id}</p>
                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                          {audience.next_scheduled_refresh && (
                            <span>Next Refresh: {new Date(audience.next_scheduled_refresh).toLocaleString()}</span>
                          )}
                          {audience.scheduled_refresh !== undefined && (
                            <span>Scheduled Refresh: {audience.scheduled_refresh ? 'Enabled' : 'Disabled'}</span>
                          )}
                          {audience.refresh_interval && (
                            <span>Interval: {audience.refresh_interval}h</span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(audience.id, audience.name)}
                        disabled={deleteMutation.isPending}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {data && data.total > pageSize && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="border-gray-300"
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {page} of {Math.ceil(data.total / pageSize)}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= Math.ceil(data.total / pageSize)}
                  className="border-gray-300"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* Info Card */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mt-8">
          <h3 className="font-semibold text-blue-900 mb-2">
            💡 About Audiences
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Create targeted audience segments based on specific criteria</li>
            <li>• Schedule automatic refreshes to keep your audiences up-to-date</li>
            <li>• Use audiences across your campaigns and enrichment workflows</li>
            <li>• Monitor audience size and refresh status in real-time</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
