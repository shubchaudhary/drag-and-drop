import "./App.css";
import { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const defaultData = [
    {
        id: 1,
        title: "Profile Summary",
        isTicked: false,
    },
    {
        id: 2,
        title: "Academic and Cocurricular Achievements",
        isTicked: false,
    },
    {
        id: 3,
        title: "Summer internship Experience",
        isTicked: false,
    },
    {
        id: 4,
        title: "Work Experience",
        isTicked: false,
    },
    {
        id: 5,
        title: "Projects",
        isTicked: false,
    },
    {
        id: 6,
        title: "Certifications",
        isTicked: false,
    },
    {
        id: 7,
        title: "Leadership Positions",
        isTicked: false,
    },
    {
        id: 8,
        title: "Extracurricular",
        isTicked: false,
    },
    {
        id: 9,
        title: "Education",
        isTicked: false,
    },
];

function App() {
    const [listData, setListData] = useState(null);
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 0,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 0,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        const localListData = JSON.parse(localStorage.getItem("listData"));
        if (!localListData) {
            localStorage.setItem("listData", JSON.stringify(defaultData));
            setListData(defaultData);
        } else {
            setListData(localListData);
        }
    }, []);

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active && over && active.id !== over.id) {
            setListData((items) => {
                const draggedIndex = items.findIndex((item) => item.id === active.id);
                const overIndex = items.findIndex((item) => item.id === over.id);

                const updatedItems = arrayMove(items, draggedIndex, overIndex);
                return updatedItems;
            });
        }
    }

    return (
        <>
            {listData && (
                <div style={{ width: "80%" }}>
                    <h1
                        className="w-full text-center"
                        style={{
                            marginTop: "58px",
                            marginBottom: "44px",
                            fontWeight: 400,
                            fontSize: "32px",
                            lineHeight: "40px",
                        }}
                    >
                        Select your sections
                    </h1>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={listData.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                            {listData.map((item) => (
                                <SortableItem key={item.id} id={item.id} title={item.title} />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "32px",
                            marginBottom: "44px",
                        }}
                    >
                        <button
                            style={{
                                backgroundColor: "#8A4893",
                                width: "429px",
                                height: "52px",
                                borderRadius: "10px",
                                color: "#fff",
                                gap: "10px",
                            }}
                            onClick={() => {
                                var cards = document.getElementsByClassName("card");
                                var list = [];
                                for (var i = 0; i < cards.length; i++) {
                                    list.push({
                                        title: cards[i].childNodes[2].childNodes[0].innerHTML,
                                        isTicked: cards[i].childNodes[4].childNodes[0].checked,
                                    });
                                }
                                localStorage.setItem("listData", JSON.stringify(list));
                            }}
                        >
                            {"Save and Next"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
