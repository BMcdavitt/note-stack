import { Card, Flex } from "antd";

const NoteStackMain = () => {
  const Notebooks = [
    { title: "Notebook 1", description: "My Work Notebook" },
    { title: "Notebook 2", description: "My Quick Notebook" },
    { title: "Notebook 3", description: "Random Ideas" },
    { title: "Dreams", description: "My Dreams Notebook" },
  ];
  return (
    <Flex wrap="wrap" gap={10}>
      {Notebooks.map((notebook) => {
        return (
          <Card title={notebook.title} style={{ width: 500 }}>
            {notebook.description}
          </Card>
        );
      })}
    </Flex>
  );
};

export default NoteStackMain;
