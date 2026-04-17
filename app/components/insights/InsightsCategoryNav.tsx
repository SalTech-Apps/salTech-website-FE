import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/react";
import { IoChevronDown, IoSearchOutline } from "react-icons/io5";
import { FaRss } from "react-icons/fa";

export const INSIGHT_CATEGORIES = [
  "BUYING GUIDES",
  "INVESTMENT STRATEGY",
  "MARKET UPDATES",
  "DIASPORA INVESTOR GUIDES",
  "PROPERTY MANAGEMENT TIPS",
  "LEGAL & COMPLIANCE",
] as const;

export type InsightCategory = (typeof INSIGHT_CATEGORIES)[number];

function formatCategoryLabel(cat: string): string {
  return cat
    .replace(/_/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => (w === "&" ? "&" : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(" ");
}

const pillActiveClass =
  "shrink-0 rounded-full w-fit bg-white px-4 py-1.5 text-sm font-medium text-zinc-950 shadow-sm";
const linkInactiveClass =
  "shrink-0 w-fit whitespace-nowrap text-sm text-gray-100 transition-colors hover:text-neutral-200";

const sheetRowActiveClass =
  "flex w-full min-h-[44px] items-center rounded-xl bg-white px-4 py-3 text-left text-sm font-medium text-zinc-950 shadow-sm";
const sheetRowInactiveClass =
  "flex w-full min-h-[44px] items-center rounded-xl px-4 py-3 text-left text-sm text-gray-100 transition-colors hover:bg-white/5";

export interface InsightsCategoryNavProps {
  selectedCategory?: string | null;
  onCategoryChange?: (category: string | null) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchDisabled?: boolean;
}

export function InsightsCategoryNav({
  selectedCategory = null,
  onCategoryChange,
  searchQuery = "",
  onSearchChange,
  searchDisabled = false,
}: InsightsCategoryNavProps) {
  const isInteractive = typeof onCategoryChange === "function";
  const isAllSelected = selectedCategory == null;
  const showSearch = typeof onSearchChange === "function" && !searchDisabled;
  const [categorySheetOpen, setCategorySheetOpen] = useState(false);

  const selectedCategoryLabel = isAllSelected
    ? "All insights"
    : formatCategoryLabel(selectedCategory!);

  return (
    <section className="border-b border-white/10 bg-main-background py-4">
      <div className="container mx-auto flex flex-wrap justify-between px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-w-0 w-full flex-col gap-3 px-4 pb-1 sm:px-0 lg:w-fit lg:min-w-0 lg:flex-nowrap lg:flex-row lg:items-center lg:gap-x-8">
          {isInteractive ? (
            <>
              <div className="mx-auto hidden min-w-0 w-fit flex-nowrap items-center justify-center gap-x-8 lg:flex">
                <button
                  type="button"
                  onClick={() => onCategoryChange(null)}
                  className={isAllSelected ? pillActiveClass : linkInactiveClass}
                >
                  All insights
                </button>
                {INSIGHT_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => onCategoryChange(cat)}
                      className={isSelected ? pillActiveClass : linkInactiveClass}
                    >
                      {formatCategoryLabel(cat)}
                    </button>
                  );
                })}
              </div>
              <div className="flex w-full min-w-0 lg:hidden">
                <Button
                  radius="full"
                  variant="bordered"
                  className="h-11 min-h-11 w-full justify-between border-white/15 bg-main-background px-4 font-medium text-gray-100"
                  endContent={
                    <IoChevronDown className="h-5 w-5 shrink-0 text-neutral-400" />
                  }
                  aria-expanded={categorySheetOpen}
                  aria-haspopup="dialog"
                  onPress={() => setCategorySheetOpen(true)}
                >
                  <span className="min-w-0 truncate text-left text-sm">
                    <span className="text-neutral-500">Category · </span>
                    {selectedCategoryLabel}
                  </span>
                </Button>
              </div>
              <Drawer
                isOpen={categorySheetOpen}
                onOpenChange={setCategorySheetOpen}
                placement="bottom"
                scrollBehavior="inside"
                size="5xl"
                classNames={{
                  base: "rounded-t-xl border-t border-white/10 bg-main-background sm:rounded-t-2xl",
                }}
              >
                <DrawerContent className="max-h-[min(85dvh,560px)] bg-main-background">
                  {(onClose) => (
                    <>
                      <DrawerHeader className="flex flex-col gap-0.5 border-b border-white/10 pb-4">
                        <span className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                          Browse
                        </span>
                        <span className="text-lg font-medium text-white">
                          Category
                        </span>
                      </DrawerHeader>
                      <DrawerBody className="flex flex-col gap-2 py-4">
                        <button
                          type="button"
                          onClick={() => {
                            onCategoryChange(null);
                            onClose();
                          }}
                          className={
                            isAllSelected ? sheetRowActiveClass : sheetRowInactiveClass
                          }
                        >
                          All insights
                        </button>
                        {INSIGHT_CATEGORIES.map((cat) => {
                          const isSelected = selectedCategory === cat;
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => {
                                onCategoryChange(cat);
                                onClose();
                              }}
                              className={
                                isSelected ? sheetRowActiveClass : sheetRowInactiveClass
                              }
                            >
                              {formatCategoryLabel(cat)}
                            </button>
                          );
                        })}
                      </DrawerBody>
                      <DrawerFooter className="border-t border-white/10 pt-2">
                        <Button
                          radius="full"
                          className="h-11 w-full bg-white font-medium text-zinc-950"
                          onPress={onClose}
                        >
                          Done
                        </Button>
                      </DrawerFooter>
                    </>
                  )}
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            <div className="mx-auto flex w-fit min-w-0 flex-nowrap items-center gap-x-8">
              <span className={pillActiveClass}>All insights</span>
              {INSIGHT_CATEGORIES.map((cat) => (
                <span key={cat} className={linkInactiveClass}>
                  {formatCategoryLabel(cat)}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="pt-6 flex w-full min-w-0 float-right mx-auto items-center justify-end gap-2 sm:gap-3 lg:mt-0 lg:w-auto ">
          {showSearch ? (
            <label className="relative order-2 flex min-h-[40px] min-w-0 w-full flex-1 basis-full sm:order-1 sm:max-w-xs sm:basis-auto lg:max-w-[280px] lg:flex-initial">
              <span className="sr-only">Search insights</span>
              <IoSearchOutline
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                aria-hidden
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search articles"
                autoComplete="off"
                className="w-full rounded-full border border-white/10 bg-main-background py-2 pl-9 pr-4 text-sm text-main-text-headlines placeholder:text-neutral-500 outline-none ring-0 transition-[border-color,box-shadow] focus:border-white/20 focus:ring-1 focus:ring-white/10"
              />
            </label>
          ) : (
            <div className="relative order-2 flex min-h-[40px] min-w-0 w-full flex-1 basis-full items-center rounded-full border border-white/5 bg-main-background/50 sm:order-1 sm:max-w-xs sm:basis-auto lg:max-w-[280px]">
              <IoSearchOutline
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600"
                aria-hidden
              />
              <span className="pl-9 pr-4 text-sm text-neutral-600">
                Search articles
              </span>
            </div>
          )}
          <a
            href="/insights/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="order-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:border-white/20 hover:text-neutral-200 sm:order-2"
            aria-label="RSS feed for insights"
            title="RSS feed"
          >
            <FaRss className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
