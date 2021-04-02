import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IMove } from "../interface";

interface SingleSaveButtonProps {
  handleSaveRoutine: () => void;
  apparatus: string;
  routineArray: IMove[];
}

const SingleSaveButton: React.FC<SingleSaveButtonProps> = ({
  handleSaveRoutine,
  apparatus,
  routineArray,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.addButton} onPress={handleSaveRoutine}>
        <Text style={styles.addButtonText}>
          {apparatus === "Vault"
            ? `Save Vault${routineArray.length === 2 ? "s" : ""}`
            : "Save routine"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    borderColor: "#89BFFF",
    backgroundColor: "#89BFFF",
    borderWidth: 2,
    height: 50,
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
  },
});

export default SingleSaveButton;
