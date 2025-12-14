import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Copy, Plus, Trash2, CheckCircle, Code2, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CreatePixelDialog } from "@/components/pixels/CreatePixelDialog";
import { toast } from "sonner";

export default function PixelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pixelToDelete, setPixelToDelete] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch pixels
  const { data: pixelsResponse, isLoading, error, refetch } = trpc.audienceLabAPI.pixels.list.useQuery();

  // Delete pixel mutation
  const deleteMutation = trpc.audienceLabAPI.pixels.delete.useMutation({
    onSuccess: () => {
      toast.success("Pixel deleted successfully");
      refetch();
      setDeleteDialogOpen(false);
      setPixelToDelete(null);
    },
    onError: (error) => {
      toast.error(`Failed to delete pixel: ${error.message}`);
    },
  });

  // Extract pixels array from response
  const pixels = pixelsResponse?.data || [];

  // Filter pixels based on search
  const filteredPixels = pixels.filter((pixel) =>
    pixel.website_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pixel.website_url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pixel.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (pixelId: string) => {
    setPixelToDelete(pixelId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (pixelToDelete) {
      deleteMutation.mutate({ id: pixelToDelete });
    }
  };

  const copyToClipboard = async (text: string, pixelId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(pixelId);
      toast.success("Install URL copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pixels</h1>
                <p className="text-sm text-gray-600">Manage your tracking pixels and install URLs</p>
              </div>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Pixel
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search pixels by name, URL, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 mb-8">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-red-900">Error Loading Pixels</h3>
                <p className="text-sm text-red-700 mt-1">{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        )}

        {/* Pixels Grid */}
        {!isLoading && !error && (
          <>
            {filteredPixels.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPixels.map((pixel) => (
                  <div key={pixel.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{pixel.website_name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{pixel.website_url}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(pixel.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Pixel ID */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Pixel ID</p>
                      <p className="text-sm text-gray-900 font-mono bg-gray-50 p-3 rounded-lg border border-gray-200">
                        {pixel.id}
                      </p>
                    </div>

                    {/* Install URL */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">Install URL</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(pixel.install_url, pixel.id)}
                          className="h-8 px-3"
                        >
                          {copiedId === pixel.id ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                              <span className="text-sm text-green-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-1" />
                              <span className="text-sm">Copy</span>
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-900 font-mono bg-gray-50 p-3 rounded-lg border border-gray-200 break-all">
                        {pixel.install_url}
                      </p>
                    </div>

                    {/* Last Sync */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Last Sync</p>
                      <p className="text-sm text-gray-600">
                        {new Date(pixel.last_sync).toLocaleString()}
                      </p>
                    </div>

                    {/* Webhook URL */}
                    {pixel.webhook_url && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Webhook URL</p>
                        <p className="text-xs text-gray-900 font-mono bg-gray-50 p-3 rounded-lg border border-gray-200 break-all">
                          {pixel.webhook_url}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Code2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  {searchQuery ? "No pixels found matching your search" : "No pixels yet. Create your first pixel to get started."}
                </p>
                {!searchQuery && (
                  <Button
                    onClick={() => setCreateDialogOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Pixel
                  </Button>
                )}
              </div>
            )}

            {/* Results Count */}
            {filteredPixels.length > 0 && (
              <div className="mt-8 text-center text-sm text-gray-600">
                Showing {filteredPixels.length} of {pixels.length} pixels
              </div>
            )}
          </>
        )}

        {/* Info Card */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mt-8">
          <h3 className="font-semibold text-blue-900 mb-2">
            💡 About Pixels
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Track visitor behavior and conversions on your websites</li>
            <li>• Copy install URLs to embed tracking pixels on your pages</li>
            <li>• Monitor last sync times to ensure pixels are active</li>
            <li>• Configure webhook URLs for real-time event notifications</li>
          </ul>
        </div>
      </main>

      {/* Create Pixel Dialog */}
      <CreatePixelDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={() => {
          refetch();
          setCreateDialogOpen(false);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Pixel?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the pixel and remove
              all tracking data associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
