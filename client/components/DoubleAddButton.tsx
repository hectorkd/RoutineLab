import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IMove } from "../interface";

interface DoubleAddButtonProps {
  navigation: any;
  handleSaveRoutine: any;
  routineArray: IMove[];
  elements: IMove[];
  apparatus: string;
  setRoutineArray: React.Dispatch<React.SetStateAction<IMove[]>>;
  isChanging: boolean;
}

const DoubleAddButton: React.FC<DoubleAddButtonProps> = ({
  handleSaveRoutine,
  elements,
  apparatus,
  setRoutineArray,
  isChanging,
  routineArray,
  navigation,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.twoButtons, styles.buttonSpace]}
        onPress={handleSaveRoutine}
      >
        <Text style={styles.addButtonText}>
          {apparatus === "Vault" ? "Save vault" : "Save routine"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.twoButtons}
        onPress={() =>
          navigation.navigate("ELEMENTS", {
            elements,
            apparatus: apparatus,
            setRoutineArray: setRoutineArray,
            routine: routineArray,
            isChanging: false,
          })
        }
      >
        <Text style={styles.addButtonText}>
          {apparatus === "Vault" ? "Add vault" : "Add element"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  twoButtons: {
    borderColor: "#89BFFF",
    backgroundColor: "#89BFFF",
    borderWidth: 2,
    height: 50,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 10,
  },
  buttonSpace: {
    marginRight: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
  },
});

export default DoubleAddButton;
