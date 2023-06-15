import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./components/card/Card";

export function SortableItem({ id, title, isTicked }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} className="sortable-item" style={style} {...attributes} {...listeners}>
            <Card title={title} isTicked={isTicked} />
        </div>
    );
}
