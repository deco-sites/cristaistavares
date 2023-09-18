import type { HTMLWidget } from "apps/admin/widgets.ts"; 

export interface Props {
    title: HTMLWidget;
    description: HTMLWidget;
}

export default function SectionDescription({title, description}: Props) {
    return (
        <section class="h-full flex flex-col items-center justify-center text-center gap-2 m-12">
            <div>
                <h1 dangerouslySetInnerHTML={{__html: title}} class="text-base font-medium" />
            </div>
            <div class="max-w-[1240px]">
                <p dangerouslySetInnerHTML={{__html: description}} class="text-[15px] leading-5 font-normal" />
            </div>
        </section>
        )
}