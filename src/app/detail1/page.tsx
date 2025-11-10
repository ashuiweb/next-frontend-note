"use server";

export default async function page({ searchParams }: { searchParams: { path: string } }) {
    const { path } = await searchParams;

    const Detail = await import(`../../${path}/index.tsx`);

    return (
        <>
            <Detail.default />
        </>
    );
}
