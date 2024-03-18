import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import NextFood from "../components/NextFood";
import NoNextFood from "../components/NoNextFood";
import Plans from "../components/Plans";
import Articles from "../components/Articles";
import Tips from "../components/Tips";
import { GetPlan } from "../api/getPlans";
import { verPreferencias } from "../api/ASUserPreferences";
import { getCalendar } from "../api/ASCalendar.js";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Advices from "../components/Advices.js";

function Home(navigation, router) {
  const [info, setInfo] = useState(false);
  const [currentPlan, setCurrentPlan] = useState();
  const comprobarInfo = async () => {
    let infos = await verPreferencias();

    const plan = infos?.currentPlan ? infos?.currentPlan : false;
    if (plan) {
      const currentPlanI = GetPlan(plan);
      setCurrentPlan(currentPlanI);
    }

    return infos.Objetivo ? infos.Objetivo : false;
  };
  const comprobarPlan = async () => {
    let infos = await verPreferencias();
    const plan = infos?.currentPlan ? infos?.currentPlan : false;
    if (plan) {
      const currPlan = await GetPlan(plan);
      setInfo(currPlan);
      return currPlan;
    }
  };
  const loadItems = async () => {
    await getCalendar();
  };
  useEffect(() => {
    comprobarPlan();
    loadItems();
    comprobarInfo();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F6ECF0" }}>
      {info ? <NextFood comprobarPlan={comprobarPlan} /> : <NoNextFood />}
      <Advices />
      <Plans />
      <Articles />
      <Tips />
    </ScrollView>
  );
}

export default Home;
