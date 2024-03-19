import { Skeleton } from "@/components/ui/skeleton";

export function PokemonsListSekeleton() {
    return <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] auto-rows-[minmax(100px,_1fr)]">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
    </div>
}