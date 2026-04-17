import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

export interface PropertiesPaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  /** Total number of items across all pages (enables "Showing X–Y of Z" display) */
  totalItems?: number;
  /** Items per page (used with totalItems for range display). Default: 9 */
  pageSize?: number;
  /** Number of sibling pages to show around current page. Default: 2 */
  siblingCount?: number;
}

function getPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | "ellipsis")[] {
  const totalVisible = siblingCount * 2 + 3; // siblings + current + first + last
  if (totalPages <= totalVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const leftSibling = Math.max(1, currentPage - siblingCount);
  const rightSibling = Math.min(totalPages, currentPage + siblingCount);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + 2 * siblingCount;
    return [
      ...Array.from({ length: leftCount }, (_, i) => i + 1),
      "ellipsis",
      totalPages,
    ];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + 2 * siblingCount;
    return [
      1,
      "ellipsis",
      ...Array.from({ length: rightCount }, (_, i) => totalPages - rightCount + 1 + i),
    ];
  }
  return [
    1,
    "ellipsis",
    ...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i),
    "ellipsis",
    totalPages,
  ];
}

export function PropertiesPagination({
  currentPage = 1,
  totalPages = 3,
  onPageChange,
  totalItems,
  pageSize = 9,
  siblingCount = 2,
}: PropertiesPaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange?.(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange?.(currentPage + 1);
  };
  const handleFirst = () => onPageChange?.(1);
  const handleLast = () => onPageChange?.(totalPages);

  const pageRange = getPageRange(currentPage, totalPages, siblingCount);
  const showJumpButtons = pageRange.includes("ellipsis");

  const startItem = totalItems != null ? (currentPage - 1) * pageSize + 1 : null;
  const endItem =
    totalItems != null
      ? Math.min(currentPage * pageSize, totalItems)
      : null;

  const btnBase =
    "inline-flex items-center justify-center min-w-[40px] h-10 px-3 text-body font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:ring-offset-2 focus:ring-offset-main-background disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";
  const btnDefault =
    "border border-soft-divider-line bg-secondary-background text-main-text-headlines hover:border-primary-gold/40 hover:text-primary-gold";
  const btnActive =
    "bg-primary-gold text-main-background border border-primary-gold hover:bg-soft-gold-hover-state";

  return (
    <nav
      className="flex flex-col items-center gap-4 py-8"
      aria-label="Pagination"
    >
      {totalItems != null && totalItems > 0 && (
        <p className="text-sm text-main-text-body">
          Showing{" "}
          <span className="font-semibold text-main-text-headlines">
            {startItem}–{endItem}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-main-text-headlines">
            {totalItems}
          </span>
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {showJumpButtons && (
          <button
            type="button"
            onClick={handleFirst}
            disabled={currentPage <= 1}
            className={`${btnBase} ${btnDefault}`}
            aria-label="Go to first page"
          >
            <FaAngleDoubleLeft className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage <= 1}
          className={`${btnBase} ${btnDefault} gap-1.5 px-4`}
          aria-label="Go to previous page"
        >
          <FaChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        <div className="flex items-center gap-1">
          {pageRange.map((page, idx) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                className="flex h-10 min-w-[40px] items-center justify-center px-2 text-main-text-body"
                aria-hidden
              >
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange?.(page)}
                className={`${btnBase} ${page === currentPage ? btnActive : btnDefault}`}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className={`${btnBase} ${btnDefault} gap-1.5 px-4`}
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <FaChevronRight className="h-4 w-4" />
        </button>
        {showJumpButtons && (
          <button
            type="button"
            onClick={handleLast}
            disabled={currentPage >= totalPages}
            className={`${btnBase} ${btnDefault}`}
            aria-label="Go to last page"
          >
            <FaAngleDoubleRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </nav>
  );
}
