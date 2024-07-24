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
            <div
                style={{
                    fontSize: 48,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {doc?.title ?? 'Taner'}
            </div>
        ),
        {
            ...size,
        }
    )
}
