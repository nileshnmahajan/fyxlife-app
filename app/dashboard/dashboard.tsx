import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function Dashboard() {
  return (
  <View style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 20 }}>
    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#37474F", marginBottom: 16 }}>Hi Nilesh 👋</Text>

      {/* Goal Cards */}
    <Card style={{ marginBottom: 12, borderRadius: 16, backgroundColor: "#6C63FF" }}>
        <Card.Content>
      <Text style={{ color: "#fff", fontWeight: "600" }}>🏃 Move</Text>
        </Card.Content>
      </Card>

    <Card style={{ marginBottom: 12, borderRadius: 16, backgroundColor: "#FF6F61" }}>
        <Card.Content>
      <Text style={{ color: "#fff", fontWeight: "600" }}>🍽 Eat</Text>
        </Card.Content>
      </Card>

    <Card style={{ marginBottom: 12, borderRadius: 16, backgroundColor: "#4DB6AC" }}>
        <Card.Content>
      <Text style={{ color: "#fff", fontWeight: "600" }}>😌 Calm</Text>
        </Card.Content>
      </Card>

      {/* Paper Button styled with theme */}
    <Button mode="contained" style={{ marginTop: 16 }} onPress={() => {}}>
        Add Goal
      </Button>
    </View>
  );
}
