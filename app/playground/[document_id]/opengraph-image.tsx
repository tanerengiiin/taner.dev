import { ImageResponse } from 'next/og'
import playgroundDocs from "@/lib/playground-docs";
export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { document_id: string } }) {

    const doc = playgroundDocs.find((x) => x.id === params.document_id);
    return new ImageResponse(
        (
            <div tw='rounded-xl bg-white w-full h-full p-4 flex flex-col justify-between items-start'>
                <div>
                    <div tw='inline-flex items-center gap-2'>
                        <div tw='w-12 h-12 rounded-full bg-main' />
                        <div tw='text-5xl text-neutral-800 font-medium'>/ Taner</div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
