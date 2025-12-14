import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface NewEnrichmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

type EnrichmentType = "contact" | "company" | "demographic";

interface FormData {
  name: string;
  file: File | null;
  type: EnrichmentType;
  batchSize: number;
  priority: "low" | "medium" | "high";
}

export default function NewEnrichmentDialog({
  open,
  onOpenChange,
  onSuccess,
}: NewEnrichmentDialogProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    file: null,
    type: "contact",
    batchSize: 100,
    priority: "medium",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.name.endsWith(".csv")) {
        toast.error("Please upload a CSV file");
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setFormData({ ...formData, file });
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name.trim()) {
        toast.error("Please enter an enrichment name");
        return;
      }
      if (!formData.file) {
        toast.error("Please upload a CSV file");
        return;
      }
    }
    if (step === 2) {
      if (formData.batchSize < 1 || formData.batchSize > 1000) {
        toast.error("Batch size must be between 1 and 1000");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("Enrichment job created successfully!", {
        description: `"${formData.name}" has been queued for processing`,
      });
      
      // Reset form and close dialog
      setFormData({
        name: "",
        file: null,
        type: "contact",
        batchSize: 100,
        priority: "medium",
      });
      setStep(1);
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to create enrichment job", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setStep(1);
      setFormData({
        name: "",
        file: null,
        type: "contact",
        batchSize: 100,
        priority: "medium",
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>Create New Enrichment</DialogTitle>
          <DialogDescription>
            Step {step} of 3: {step === 1 ? "Upload Data" : step === 2 ? "Configure Settings" : "Review & Submit"}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Enrichment Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Q1 Lead Enrichment"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Upload CSV File *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-2">
                  {formData.file ? (
                    <span className="text-green-600 font-medium flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {formData.file.name}
                    </span>
                  ) : (
                    "Click to upload or drag and drop"
                  )}
                </p>
                <p className="text-xs text-gray-500 mb-4">CSV files up to 10MB</p>
                <Input
                  id="file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="max-w-xs mx-auto"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">CSV Format Requirements</p>
                  <ul className="text-blue-700 space-y-1 list-disc list-inside">
                    <li>First row must contain column headers</li>
                    <li>Required columns: email or company name</li>
                    <li>Supported columns: name, title, company, location, etc.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Configure */}
        {step === 2 && (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="type">Enrichment Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: EnrichmentType) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contact">Contact Enrichment</SelectItem>
                  <SelectItem value="company">Company Enrichment</SelectItem>
                  <SelectItem value="demographic">Demographic Enrichment</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                {formData.type === "contact" && "Enrich contact information (email, phone, social profiles)"}
                {formData.type === "company" && "Enrich company data (industry, size, revenue, location)"}
                {formData.type === "demographic" && "Enrich demographic data (age, gender, interests)"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchSize">Batch Size *</Label>
              <Input
                id="batchSize"
                type="number"
                min="1"
                max="1000"
                value={formData.batchSize}
                onChange={(e) =>
                  setFormData({ ...formData, batchSize: parseInt(e.target.value) || 100 })
                }
              />
              <p className="text-xs text-gray-500">
                Number of records to process per batch (1-1000)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Standard processing)</SelectItem>
                  <SelectItem value="medium">Medium (Faster processing)</SelectItem>
                  <SelectItem value="high">High (Priority processing)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6 py-4">
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Review Your Enrichment</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">File</p>
                  <p className="font-medium text-gray-900">{formData.file?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium text-gray-900 capitalize">{formData.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Batch Size</p>
                  <p className="font-medium text-gray-900">{formData.batchSize} records</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <p className="font-medium text-gray-900 capitalize">{formData.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">File Size</p>
                  <p className="font-medium text-gray-900">
                    {formData.file ? `${(formData.file.size / 1024).toFixed(2)} KB` : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-900">
                  <p className="font-medium mb-1">Ready to Process</p>
                  <p className="text-green-700">
                    Your enrichment job will be queued and processing will begin shortly.
                    You'll receive notifications as the job progresses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <div className="flex justify-between w-full">
            <div>
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              {step < 3 ? (
                <Button onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Enrichment"
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
