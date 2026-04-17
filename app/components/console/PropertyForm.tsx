import { useState, useRef } from "react";
import { Button, Checkbox, Input, Select, SelectItem, Textarea } from "@heroui/react";
import type { InvestmentData, Property } from "@/types/firestore";
import { INVESTMENT_DATA_DEFAULTS } from "@/lib/investmentDefaults";
import { IoCloseOutline, IoCloudUploadOutline, IoChevronDownOutline, IoChevronForwardOutline, IoAddOutline } from "react-icons/io5";

const STATUS_OPTIONS = ["AVAILABLE", "UNDER OFFER", "SOLD OUT"];
const MAX_IMAGES = 6;
const MIN_IMAGES = 1;

const TITLE_DOCUMENT_OPTIONS = [
  "Governor's Consent",
  "Certificate of Occupancy (C of O)",
  "Excision",
  "Gazette",
  "Registered Conveyance",
];
const MARKET_DEMAND_OPTIONS = ["HIGH", "MEDIUM", "LOW"];
const FLOOD_RISK_OPTIONS = ["LOW (ZONE A)", "MEDIUM (ZONE B)", "HIGH (ZONE C)"];
const TENURE_OPTIONS = ["Freehold", "Leasehold (99 years)", "Leasehold (50 years)"];
const SURVEY_PLAN_OPTIONS = ["Available", "In progress", "Not applicable"];

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface PropertyFormData {
  title: string;
  slug: string;
  location: string;
  price: string;
  status: string;
  beds: number;
  baths: number;
  sqm: number;
  features: string[];
  description: string;
  featuredOnHomepage: boolean;
  isRental: boolean;
  investmentData?: InvestmentData;
}

interface PropertyFormProps {
  initial?: Partial<Property>;
  onSubmit: (
    data: PropertyFormData,
    mainImage: File | null,
    thumbnailFiles: File[]
  ) => Promise<void>;
  submitLabel: string;
}

export function PropertyForm({ initial, onSubmit, submitLabel }: PropertyFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(
    initial?.slug ?? (initial?.title ? toSlug(initial.title) : "")
  );
  const [location, setLocation] = useState(initial?.location ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [status, setStatus] = useState(initial?.status ?? "AVAILABLE");
  const [beds, setBeds] = useState(String(initial?.beds ?? ""));
  const [baths, setBaths] = useState(String(initial?.baths ?? ""));
  const [sqm, setSqm] = useState(String(initial?.sqm ?? ""));
  const [features, setFeatures] = useState<string[]>(
    (initial?.features ?? []).length > 0 ? initial!.features! : [""]
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [featuredOnHomepage, setFeaturedOnHomepage] = useState(
    initial?.featuredOnHomepage ?? false
  );
  const [isRental, setIsRental] = useState(initial?.isRental ?? false);

  const inv = initial?.investmentData;
  const defaults = INVESTMENT_DATA_DEFAULTS;
  const [fiberConnectivity, setFiberConnectivity] = useState(inv?.fiberConnectivity ?? defaults.fiberConnectivity ?? "");
  const [commercialProximity, setCommercialProximity] = useState(inv?.commercialProximity ?? defaults.commercialProximity ?? "");
  const [roadNetwork, setRoadNetwork] = useState(inv?.roadNetwork ?? defaults.roadNetwork ?? "");
  const [powerSupply, setPowerSupply] = useState(inv?.powerSupply ?? defaults.powerSupply ?? "");
  const [waterSupply, setWaterSupply] = useState(inv?.waterSupply ?? defaults.waterSupply ?? "");
  const [nearestLandmark, setNearestLandmark] = useState(inv?.nearestLandmark ?? "");
  const [estateName, setEstateName] = useState(inv?.estateName ?? "");
  const [floodRiskProfile, setFloodRiskProfile] = useState(inv?.floodRiskProfile ?? defaults.floodRiskProfile ?? "");
  const [erosionSusceptibility, setErosionSusceptibility] = useState(inv?.erosionSusceptibility ?? defaults.erosionSusceptibility ?? "");
  const [securityRating, setSecurityRating] = useState(inv?.securityRating ?? defaults.securityRating ?? "");
  const [securityDescription, setSecurityDescription] = useState(inv?.securityDescription ?? defaults.securityDescription ?? "");
  const [marketDemand, setMarketDemand] = useState(inv?.marketDemand ?? defaults.marketDemand ?? "");
  const [marketDemandDescription, setMarketDemandDescription] = useState(inv?.marketDemandDescription ?? defaults.marketDemandDescription ?? "");
  const [titleDocument, setTitleDocument] = useState(inv?.titleDocument ?? defaults.titleDocument ?? "");
  const [titleVerificationNote, setTitleVerificationNote] = useState(inv?.titleVerificationNote ?? defaults.titleVerificationNote ?? "");
  const [tenure, setTenure] = useState(inv?.tenure ?? defaults.tenure ?? "");
  const [surveyPlanStatus, setSurveyPlanStatus] = useState(inv?.surveyPlanStatus ?? defaults.surveyPlanStatus ?? "");
  const [buildingPlanStatus, setBuildingPlanStatus] = useState(inv?.buildingPlanStatus ?? defaults.buildingPlanStatus ?? "");
  const [complianceNotesStr, setComplianceNotesStr] = useState(
    (inv?.complianceNotes ?? defaults.complianceNotes ?? []).join(", ")
  );
  const [scumlRequired, setScumlRequired] = useState(inv?.scumlRequired ?? defaults.scumlRequired ?? true);

  const [investmentSectionOpen, setInvestmentSectionOpen] = useState(false);

  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>(
    initial?.image ?? ""
  );
  const [thumbnailFiles, setThumbnailFiles] = useState<File[]>([]);
  const [thumbnailPreviews, setThumbnailPreviews] = useState<string[]>(
    initial?.thumbnails ?? []
  );
  const totalImageCount = (mainImagePreview ? 1 : 0) + thumbnailPreviews.length;
  const canAddMoreImages = totalImageCount < MAX_IMAGES;

  const [saving, setSaving] = useState(false);
  const mainInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  function handleMainImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImageFile(file);
    setMainImagePreview(URL.createObjectURL(file));
  }

  function handleThumbnails(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const currentTotal = (mainImagePreview ? 1 : 0) + thumbnailPreviews.length;
    const slotsLeft = Math.max(0, MAX_IMAGES - currentTotal);
    const toAdd = files.slice(0, slotsLeft);
    setThumbnailFiles((prev) => [...prev, ...toAdd]);
    setThumbnailPreviews((prev) => [
      ...prev,
      ...toAdd.map((f) => URL.createObjectURL(f)),
    ]);
  }

  function removeThumb(index: number) {
    setThumbnailFiles((prev) => prev.filter((_, i) => i !== index));
    setThumbnailPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function setFeatureAt(index: number, value: string) {
    setFeatures((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function addFeature() {
    setFeatures((prev) => [...prev, ""]);
  }

  function removeFeature(index: number) {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (totalImageCount < MIN_IMAGES) {
      return; // show validation below
    }
    if (totalImageCount > MAX_IMAGES) {
      return;
    }
    setSaving(true);
    try {
      const complianceNotes = complianceNotesStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      await onSubmit(
        {
          title,
          slug: slug.trim() || toSlug(title),
          location,
          price,
          status,
          beds: Number(beds) || 0,
          baths: Number(baths) || 0,
          sqm: Number(sqm) || 0,
          features: features.map((f) => f.trim()).filter(Boolean),
          description,
          featuredOnHomepage,
          isRental,
          investmentData: {
            fiberConnectivity: fiberConnectivity || undefined,
            commercialProximity: commercialProximity || undefined,
            roadNetwork: roadNetwork || undefined,
            powerSupply: powerSupply || undefined,
            waterSupply: waterSupply || undefined,
            nearestLandmark: nearestLandmark || undefined,
            estateName: estateName || undefined,
            floodRiskProfile: floodRiskProfile || undefined,
            erosionSusceptibility: erosionSusceptibility || undefined,
            securityRating: securityRating || undefined,
            securityDescription: securityDescription || undefined,
            marketDemand: marketDemand || undefined,
            marketDemandDescription: marketDemandDescription || undefined,
            titleDocument: titleDocument || undefined,
            titleVerificationNote: titleVerificationNote || undefined,
            tenure: tenure || undefined,
            surveyPlanStatus: surveyPlanStatus || undefined,
            buildingPlanStatus: buildingPlanStatus || undefined,
            complianceNotes: complianceNotes.length > 0 ? complianceNotes : undefined,
            scumlRequired,
          },
        },
        mainImageFile,
        thumbnailFiles
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClasses = {
    input: "text-main-text-headlines",
    inputWrapper: "bg-main-background border border-soft-divider-line",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl">
      <Input
        label="Title"
        value={title}
        onChange={(e) => {
          const val = e.target.value;
          setTitle(val);
          if (!initial?.slug) setSlug(toSlug(val));
        }}
        classNames={inputClasses}
        isRequired
      />

      <Input
        label="URL slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        classNames={inputClasses}
        placeholder="luxury-villa-lekki"
        description="Used in URL: /properties/your-slug"
      />

      <Input
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        classNames={inputClasses}
        isRequired
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price (e.g. ₦180,000,000)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          classNames={inputClasses}
          isRequired
        />
        <Select
          label="Status"
          selectedKeys={[status]}
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0] as string;
            if (val) setStatus(val);
          }}
          classNames={{
            trigger: "bg-main-background border border-soft-divider-line",
            value: "text-main-text-headlines",
          }}
        >
          {STATUS_OPTIONS.map((s) => (
            <SelectItem key={s}>{s}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Beds"
          type="number"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          classNames={inputClasses}
        />
        <Input
          label="Baths"
          type="number"
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
          classNames={inputClasses}
        />
        <Input
          label="Sqm"
          type="number"
          value={sqm}
          onChange={(e) => setSqm(e.target.value)}
          classNames={inputClasses}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-main-text-headlines">
          Features
        </label>
        {features.map((value, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={value}
              onChange={(e) => setFeatureAt(index, e.target.value)}
              placeholder="e.g. Fully detached, Fitted kitchen"
              classNames={inputClasses}
              className="flex-1"
            />
            <Button
              type="button"
              isIconOnly
              radius="none"
              variant="light"
              color="danger"
              onPress={() => removeFeature(index)}
              isDisabled={features.length <= 1}
              aria-label="Remove feature"
              className="shrink-0"
            >
              <IoCloseOutline size={20} />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          radius="none"
          variant="bordered"
          startContent={<IoAddOutline size={18} />}
          onPress={addFeature}
          className="border-soft-divider-line text-muted-labels hover:border-primary-gold/40 hover:text-primary-gold"
        >
          Add feature
        </Button>
      </div>

      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        classNames={{
          input: "text-main-text-headlines",
          inputWrapper: "bg-main-background border border-soft-divider-line",
        }}
        minRows={3}
      />

      <div className="flex flex-wrap gap-6">
        <Checkbox
          isSelected={featuredOnHomepage}
          onValueChange={setFeaturedOnHomepage}
          classNames={{ label: "text-main-text-headlines" }}
        >
          Show on homepage (Selected Listings)
        </Checkbox>
        <Checkbox
          isSelected={isRental}
          onValueChange={setIsRental}
          classNames={{ label: "text-main-text-headlines" }}
        >
          List as rental (show on Rentals page)
        </Checkbox>
      </div>

      <div className="border border-soft-divider-line bg-secondary-background">
        <button
          type="button"
          onClick={() => setInvestmentSectionOpen((o) => !o)}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-main-text-headlines"
        >
          Investment Intelligence (Optional)
          {investmentSectionOpen ? (
            <IoChevronDownOutline className="h-5 w-5" />
          ) : (
            <IoChevronForwardOutline className="h-5 w-5" />
          )}
        </button>
        {investmentSectionOpen && (
          <div className="border-t border-soft-divider-line p-4 space-y-4">
            <p className="text-sm text-muted-labels">Location brief, legal summary and Nigeria-relevant defaults. Override as needed.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Fiber connectivity" value={fiberConnectivity} onChange={(e) => setFiberConnectivity(e.target.value)} classNames={inputClasses} placeholder="e.g. Ready (High)" />
              <Input label="Commercial proximity" value={commercialProximity} onChange={(e) => setCommercialProximity(e.target.value)} classNames={inputClasses} placeholder="e.g. 1.5km" />
              <Input label="Road network" value={roadNetwork} onChange={(e) => setRoadNetwork(e.target.value)} classNames={inputClasses} placeholder="e.g. Excellent" />
              <Input label="Power supply" value={powerSupply} onChange={(e) => setPowerSupply(e.target.value)} classNames={inputClasses} placeholder="e.g. PHCN + Generator" />
              <Input label="Water supply" value={waterSupply} onChange={(e) => setWaterSupply(e.target.value)} classNames={inputClasses} placeholder="e.g. Borehole" />
              <Input label="Nearest landmark" value={nearestLandmark} onChange={(e) => setNearestLandmark(e.target.value)} classNames={inputClasses} />
              <Input label="Estate name" value={estateName} onChange={(e) => setEstateName(e.target.value)} classNames={inputClasses} />
              <Select label="Flood risk profile" selectedKeys={floodRiskProfile ? [floodRiskProfile] : []} onSelectionChange={(k) => setFloodRiskProfile(Array.from(k)[0] as string ?? "")} classNames={{ trigger: inputClasses.inputWrapper, value: inputClasses.input }} placeholder="Select">
                {FLOOD_RISK_OPTIONS.map((o) => <SelectItem key={o}>{o}</SelectItem>)}
              </Select>
              <Input label="Erosion susceptibility" value={erosionSusceptibility} onChange={(e) => setErosionSusceptibility(e.target.value)} classNames={inputClasses} placeholder="e.g. MINIMAL" />
              <Input label="Security rating (e.g. 9.2)" value={securityRating} onChange={(e) => setSecurityRating(e.target.value)} classNames={inputClasses} />
              <Select label="Market demand" selectedKeys={marketDemand ? [marketDemand] : []} onSelectionChange={(k) => setMarketDemand(Array.from(k)[0] as string ?? "")} classNames={{ trigger: inputClasses.inputWrapper, value: inputClasses.input }} placeholder="Select">
                {MARKET_DEMAND_OPTIONS.map((o) => <SelectItem key={o}>{o}</SelectItem>)}
              </Select>
              <Select label="Title document" selectedKeys={titleDocument ? [titleDocument] : []} onSelectionChange={(k) => setTitleDocument(Array.from(k)[0] as string ?? "")} classNames={{ trigger: inputClasses.inputWrapper, value: inputClasses.input }} placeholder="Select">
                {TITLE_DOCUMENT_OPTIONS.map((o) => <SelectItem key={o}>{o}</SelectItem>)}
              </Select>
              <Select label="Tenure" selectedKeys={tenure ? [tenure] : []} onSelectionChange={(k) => setTenure(Array.from(k)[0] as string ?? "")} classNames={{ trigger: inputClasses.inputWrapper, value: inputClasses.input }} placeholder="Select">
                {TENURE_OPTIONS.map((o) => <SelectItem key={o}>{o}</SelectItem>)}
              </Select>
              <Select label="Survey plan status" selectedKeys={surveyPlanStatus ? [surveyPlanStatus] : []} onSelectionChange={(k) => setSurveyPlanStatus(Array.from(k)[0] as string ?? "")} classNames={{ trigger: inputClasses.inputWrapper, value: inputClasses.input }} placeholder="Select">
                {SURVEY_PLAN_OPTIONS.map((o) => <SelectItem key={o}>{o}</SelectItem>)}
              </Select>
            </div>
            <Textarea label="Security description" value={securityDescription} onChange={(e) => setSecurityDescription(e.target.value)} classNames={{ input: inputClasses.input, inputWrapper: inputClasses.inputWrapper }} minRows={2} />
            <Textarea label="Market demand description" value={marketDemandDescription} onChange={(e) => setMarketDemandDescription(e.target.value)} classNames={{ input: inputClasses.input, inputWrapper: inputClasses.inputWrapper }} minRows={2} />
            <Textarea label="Title verification note" value={titleVerificationNote} onChange={(e) => setTitleVerificationNote(e.target.value)} classNames={{ input: inputClasses.input, inputWrapper: inputClasses.inputWrapper }} minRows={2} />
            <Input label="Building plan status" value={buildingPlanStatus} onChange={(e) => setBuildingPlanStatus(e.target.value)} classNames={inputClasses} placeholder="e.g. Lagos State approved" />
            <Textarea label="Compliance notes (comma-separated)" value={complianceNotesStr} onChange={(e) => setComplianceNotesStr(e.target.value)} classNames={{ input: inputClasses.input, inputWrapper: inputClasses.inputWrapper }} minRows={2} placeholder="SCUML registration mandatory, Structural certification verified, ..." />
            <Checkbox isSelected={scumlRequired} onValueChange={setScumlRequired} classNames={{ label: "text-main-text-headlines" }}>SCUML registration required</Checkbox>
          </div>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-main-text-headlines">
          Images (min {MIN_IMAGES}, max {MAX_IMAGES})
        </p>
        {totalImageCount < MIN_IMAGES && (
          <p className="mb-2 text-sm text-red-500">Add at least one image.</p>
        )}
        <p className="mb-2 text-sm font-medium text-main-text-headlines">
          Main Image
        </p>
        <input
          ref={mainInputRef}
          type="file"
          accept="image/*"
          onChange={handleMainImage}
          className="hidden"
        />
        {mainImagePreview ? (
          <div className="relative inline-block">
            <img
              src={mainImagePreview}
              alt="Main"
              className="h-40 w-60 rounded-lg object-cover border border-soft-divider-line"
            />
            <button
              type="button"
              onClick={() => {
                setMainImageFile(null);
                setMainImagePreview("");
              }}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
            >
              <IoCloseOutline size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => mainInputRef.current?.click()}
            className="flex h-40 w-60 items-center justify-center rounded-lg border-2 border-dashed border-soft-divider-line text-muted-labels hover:border-primary-gold/40 transition-colors"
          >
            <div className="text-center">
              <IoCloudUploadOutline size={32} className="mx-auto mb-2" />
              <span className="text-sm">Upload image</span>
            </div>
          </button>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-main-text-headlines">
          Additional images ({totalImageCount}/{MAX_IMAGES})
        </p>
        <input
          ref={thumbInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleThumbnails}
          className="hidden"
        />
        <div className="flex flex-wrap gap-3">
          {thumbnailPreviews.map((url, i) => (
            <div key={i} className="relative">
              <img
                src={url}
                alt=""
                className="h-24 w-32 rounded-lg object-cover border border-soft-divider-line"
              />
              <button
                type="button"
                onClick={() => removeThumb(i)}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
              >
                <IoCloseOutline size={12} />
              </button>
            </div>
          ))}
          {canAddMoreImages && (
            <button
              type="button"
              onClick={() => thumbInputRef.current?.click()}
              className="flex h-24 w-32 items-center justify-center rounded-lg border-2 border-dashed border-soft-divider-line text-muted-labels hover:border-primary-gold/40 transition-colors"
            >
              <IoCloudUploadOutline size={24} />
            </button>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Button
          radius="none"
          type="submit"
          isLoading={saving}
          isDisabled={totalImageCount < MIN_IMAGES}
          className="bg-primary-gold text-main-background font-semibold"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
