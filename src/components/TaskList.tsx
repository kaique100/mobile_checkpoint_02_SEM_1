import { useGlobalState } from "../hooks/GlobalState"
import { useState } from "react"
import { Box, FlatList, IconButton, Input, Text } from "native-base"
import { Ionicons } from "@expo/vector-icons"
import DeleteModal from "./DeleteModal"

interface TaskItemProps {
    id: number
    task: string
}

function TaskItem({ id, task }: TaskItemProps) {
    const { updateTask } = useGlobalState()

    const [updating, setUpdating] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleModal() {
        setIsModalOpen(!isModalOpen)
    }

    const [newTitle, setNewTitle] = useState(task)

    function handleUpdate() {
        if (updating) {
            updateTask(id, newTitle)
        }
        setUpdating(!updating)
    }

    return (
        <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            bg="#29292E"
            borderWidth={2}
            borderColor={"#27272A"}
            borderRadius={8}
            p={4}
            my={2}
            mx={5}
        >
            <DeleteModal handleModal={handleModal} id={id} isModalOpen={isModalOpen}/>
            {updating ? (
                <Input
                    flex={3}
                    value={newTitle}
                    onChangeText={setNewTitle}
                    color={"white"}
                />
            ) : (
                <Text color={'#FFF'} flex={3}>{task}</Text>
            )}

            <IconButton
                icon={<Ionicons name={updating ? "checkmark" : "pencil"} size={14} color="#FFF" />}
                colorScheme="light"
                onPress={handleUpdate}
                style={{ borderRadius: 50, backgroundColor: '#FBA94C', marginLeft: 4 }}
            />
            <IconButton
                icon={<Ionicons name="trash" size={14} color="#FFF" />}
                colorScheme="light"
                onPress={() => handleModal()}
                style={{ borderRadius: 50, backgroundColor: '#F75A68', marginLeft: 4 }}
            />
        </Box>
    )
}

export default function TaskList() {
    const {tasks} = useGlobalState()

    return (
        <FlatList
          data={tasks} 
          renderItem={({ item }) => <TaskItem id={item.id} task={item.task} />} 
          keyExtractor={(item) => item.id.toString()} 
          contentContainerStyle={{ flexGrow: 1 }}
        />
      );
}