import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { IMove, IStartValue, IRoutineId } from "../interface";
import SingleAddButton from "../components/SingleAddButton";
import ApiServices from "../ApiServices";
import RoutineElement from "../components/RoutineElement";
import helperFunctions from "../helperfunctions";
import { UserContext } from "../context/UserProvider";
import SingleSaveButton from "../components/SingleSaveButton";
import DoubleAddButton from "../components/DoubleAddButton";
import VaultStartValue from "../components/VaultStartValue";
import RoutineStartValue from "../components/RoutineStartValue";

interface CreateRoutineProps {
  route: any;
  navigation: any;
}

const CreateRoutine: React.FC<CreateRoutineProps> = ({ route, navigation }) => {
  const { apparatus } = route.params;

  const [routineName, setRoutineName] = useState<string>("");
  const [elements, setElements] = useState<IMove[]>([]);
  const [routineArray, setRoutineArray] = useState<IMove[]>([]);
  const [startValue, setStartValue] = useState<IStartValue>({
    eScore: "0.0",
    requirmentsTotal: "0.0",
    elementTotal: "0.0",
    totalStartValue: "0.0",
  });
  const [vaultStartValue, setVaultStartValue] = useState<IStartValue[]>([
    {
      eScore: "10.0",
      requirmentsTotal: "0.0",
      elementTotal: "0.0",
      totalStartValue: "0.0",
    },
    {
      eScore: "10.0",
      requirmentsTotal: "0.0",
      elementTotal: "0.0",
      totalStartValue: "0.0",
    },
  ]);

  const context = useContext(UserContext);

  useEffect(() => {
    ApiServices.getApparatusMoves(apparatus).then((res) => setElements(res));
  }, []);

  useEffect(() => {
    if (routineArray.length && apparatus !== "Vault") {
      const start = helperFunctions.calculateRoutineStart(routineArray);
      setStartValue(start);
    } else if (routineArray.length) {
      const start = helperFunctions.calculateVaultStart(routineArray);
      setVaultStartValue(start);
    }
  }, [routineArray]);

  function handleSaveRoutine(): void {
    if (!routineName) {
      Alert.alert("Please give the routine a name");
    } else if (!context.user) {
      Alert.alert("Please login first");
    } else {
      const routineIds: IRoutineId[] = [];
      routineArray.forEach((element) => {
        routineIds.push({ id: element._id });
      });
      ApiServices.postRoutine({
        isCompRoutine: false,
        userFirstName: context.user.firstName,
        routineName,
        apparatus: apparatus,
        routine: routineIds,
      }).then((res: any) => {
        if (res.exists) {
          Alert.alert("Sorry routine under this name already exists");
        } else {
          navigation.popToTop();
        }
      });
    }
  }

  function flatListSeperator(): JSX.Element {
    return <View style={styles.elementList}></View>;
  }

  if (apparatus === "Vault") {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TextInput
            style={styles.input}
            value={routineName}
            onChangeText={setRoutineName}
            placeholder="Name routine"
          />
        </View>
        <View style={styles.middle}>
          <View>
            {routineArray.length !== 0 && (
              <FlatList
                data={routineArray}
                style={styles.vaultList}
                renderItem={(data) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ELEMENTS", {
                        elements,
                        apparatus: apparatus,
                        setRoutineArray: setRoutineArray,
                        routine: routineArray,
                        isChanging: true,
                        index: data.index,
                      })
                    }
                  >
                    <RoutineElement
                      apparatus={apparatus}
                      move={data.item}
                      index={data.index + 1}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item: IMove) => item._id}
                ItemSeparatorComponent={flatListSeperator}
                scrollEnabled={false}
              />
            )}
            {routineArray.length !== 0 ? (
              routineArray.length < 2 ? (
                <DoubleAddButton
                  handleSaveRoutine={handleSaveRoutine}
                  navigation={navigation}
                  elements={elements}
                  apparatus={apparatus}
                  setRoutineArray={setRoutineArray}
                  routineArray={routineArray}
                  isChanging={false}
                />
              ) : (
                <SingleSaveButton
                  routineArray={routineArray}
                  apparatus={apparatus}
                  handleSaveRoutine={handleSaveRoutine}
                />
              )
            ) : (
              <SingleAddButton
                navigation={navigation}
                elements={elements}
                apparatus={apparatus}
                setRoutineArray={setRoutineArray}
                routineArray={routineArray}
                isChanging={false}
              />
            )}
          </View>
        </View>
        <View style={styles.vaultBottom}>
          <VaultStartValue
            vaultStartValue={vaultStartValue}
            routineArray={routineArray}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TextInput
            style={styles.input}
            value={routineName}
            onChangeText={setRoutineName}
            placeholder="Name routine"
          />
        </View>
        <View style={styles.middle}>
          <View>
            {routineArray.length !== 0 && (
              <FlatList
                data={routineArray}
                renderItem={(data) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ELEMENTS", {
                        elements,
                        apparatus: apparatus,
                        setRoutineArray: setRoutineArray,
                        routine: routineArray,
                        isChanging: true,
                        index: data.index,
                      })
                    }
                  >
                    <RoutineElement
                      apparatus={apparatus}
                      move={data.item}
                      index={data.index + 1}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item: IMove) => item._id}
                ItemSeparatorComponent={flatListSeperator}
                scrollEnabled={false}
                // ListHeaderComponent={flatListSeperator}
              />
            )}
            {routineArray.length < 10 ? (
              routineArray.length === 0 ? (
                <SingleAddButton
                  navigation={navigation}
                  elements={elements}
                  apparatus={apparatus}
                  setRoutineArray={setRoutineArray}
                  routineArray={routineArray}
                  isChanging={false}
                />
              ) : (
                <DoubleAddButton
                  handleSaveRoutine={handleSaveRoutine}
                  navigation={navigation}
                  elements={elements}
                  apparatus={apparatus}
                  setRoutineArray={setRoutineArray}
                  routineArray={routineArray}
                  isChanging={false}
                />
              )
            ) : (
              <SingleSaveButton
                routineArray={routineArray}
                apparatus={apparatus}
                handleSaveRoutine={handleSaveRoutine}
              />
            )}
          </View>
        </View>
        <View style={styles.bottom}>
          <RoutineStartValue startValue={startValue} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    borderColor: "#89BFFF",
    borderWidth: 2,
    width: 400,
    padding: 10,
    borderRadius: 15,
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  middle: {
    flex: 8,
    width: "100%",
  },
  bottom: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  elementList: {
    marginTop: 10,
  },
  vaultBottom: {
    flex: 3,
  },
  vaultMiddle: {
    flex: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  vaultList: {
    marginTop: 80,
    marginBottom: 20,
  },
});

export default CreateRoutine;
