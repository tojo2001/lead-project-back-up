import { useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TOptions, useLeadQueryStore } from "@/store/use-lead-query.store";

type Props = {
  criteriaKey: string;
  options: TOptions[];
};

export default function CriteriaBadgeList({ criteriaKey, options }: Props) {
  const { setCriteriaParameters } = useLeadQueryStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const onRemove = (criteriaValue: { name: string; key: string }) => {
    setCriteriaParameters(criteriaKey, criteriaValue, false);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8; // scroll ~80% of visible width

    scrollRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // ? Auto-scroll to the right when new badges are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [options.length]); // Only when number of options changes

  return (
    <div className="relative flex items-center justify-between w-full space-x-2">
      {/* Scrollable badge container */}
      <div
        ref={scrollRef}
        className="flex items-center justify-start overflow-x-auto space-x-1 scrollbar-hide py-1 scroll-smooth"
      >
        {options.map((opt) => (
          <Badge
            key={opt.key}
            variant="secondary"
            className="text-nowrap flex-shrink-0 cursor-pointer active:scale-95 select-none"
            onClick={() => onRemove({ ...opt })}
          >
            {opt.name}
          </Badge>
        ))}
      </div>

      {/* Scroll buttons */}
      {!!options.length && (
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
