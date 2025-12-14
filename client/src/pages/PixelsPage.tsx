import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { CreatePixelDialog } from "@/components/pixels/CreatePixelDialog";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortField = 'website_name' | 'website_url' | 'last_sync';
type SortDirection = 'asc' | 'desc' | null;

export default function PixelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField>('website_name');
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Fetch pixels
  const { data: pixelsResponse, isLoading, error, refetch } = trpc.audienceLabAPI.pixels.list.useQuery();

  // Extract pixels array from response
  const pixels = pixelsResponse?.data || [];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: null -> asc -> desc -> null
      if (sortDirection === null) {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortDirection(null);
        setSortField('website_name'); // Reset to default
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSeeResolutions = () => {
    toast.info('See Resolutions functionality coming soon');
  };

  const handleInstall = () => {
    toast.info('Install functionality coming soon');
  };

  const handleWebhook = () => {
    toast.info('Webhook functionality coming soon');
  };

  const handleDelete = () => {
    toast.info('Delete functionality coming soon');
  };

  // Filter and sort pixels
  let processedPixels = [...pixels];
  
  // Apply search filter
  if (searchQuery) {
    processedPixels = processedPixels.filter((pixel) =>
      pixel.website_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pixel.website_url.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply sorting
  if (sortDirection) {
    processedPixels = processedPixels.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortField) {
        case 'website_name':
          aVal = a.website_name || '';
          bVal = b.website_name || '';
          break;
        case 'website_url':
          aVal = a.website_url || '';
          bVal = b.website_url || '';
          break;
        case 'last_sync':
          aVal = new Date(a.last_sync || 0).getTime();
          bVal = new Date(b.last_sync || 0).getTime();
          break;
        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }

  // Apply pagination
  const totalItems = processedPixels.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPixels = processedPixels.slice(startIndex, endIndex);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 ml-1 inline" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="w-3 h-3 ml-1 inline" />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDown className="w-3 h-3 ml-1 inline" />;
    }
    return <ArrowUpDown className="w-3 h-3 ml-1 inline" />;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Manage Pixels</h1>
        </div>

        {/* Available Pixel Actions Box */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Pixel Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleSeeResolutions}
              className="border-gray-300"
            >
              See Resolutions
            </Button>
            <Button
              variant="outline"
              onClick={handleInstall}
              className="border-gray-300"
            >
              Install
            </Button>
            <Button
              variant="outline"
              onClick={handleWebhook}
              className="border-gray-300"
            >
              Webhook
            </Button>
            <Button
              variant="outline"
              onClick={handleDelete}
              className="border-gray-300 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Search and Pixel Count */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">{pixels.length}</span>
            <span className="text-gray-600">Pixels</span>
          </div>
          <div className="flex-1">
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Button onClick={() => setCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            Create
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-lg shadow p-12">
            <div className="flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Pixels</h3>
            <p className="text-sm text-red-700">{error.message}</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('website_name')}
                      className="flex items-center hover:text-gray-700"
                    >
                      Website Name
                      {getSortIcon('website_name')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('website_url')}
                      className="flex items-center hover:text-gray-700"
                    >
                      Website Url
                      {getSortIcon('website_url')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('last_sync')}
                      className="flex items-center hover:text-gray-700"
                    >
                      Last Sync
                      {getSortIcon('last_sync')}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedPixels.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                      {searchQuery ? 'No results.' : 'No results.'}
                    </td>
                  </tr>
                ) : (
                  paginatedPixels.map((pixel) => (
                    <tr key={pixel.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pixel.website_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pixel.website_url}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(pixel.last_sync)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Rows per page</span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => {
                    setPageSize(parseInt(value));
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  Page {totalPages === 0 ? 0 : page} of {totalPages}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(1)}
                    disabled={page === 1 || totalPages === 0}
                  >
                    «
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1 || totalPages === 0}
                  >
                    ‹
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages || totalPages === 0}
                  >
                    ›
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(totalPages)}
                    disabled={page >= totalPages || totalPages === 0}
                  >
                    »
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Pixel Dialog */}
      <CreatePixelDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={() => {
          refetch();
          setCreateDialogOpen(false);
        }}
      />
    </div>
  );
}
