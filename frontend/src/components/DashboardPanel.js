import React from "react";
import {
  LinkBox,
  LinkOverlay,
  Heading,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
  Spacer,
  Button,
  HStack,
  Center,
} from "@chakra-ui/react";
import Files from '../assets/folderwithdaclipting.png'
import Search from '../assets/magnifyingting.png'
import Upload from '../assets/uploadscreenting.png'
import { ArrowDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import MetricTile from "./MetricTile";
import { useRHBChain } from "../hooks/RHBProvider";
import ConnectMetamask from '../pages/ConnectMetamask'
import NewUserDashboard from './NewUserDashboard'
import OptionsTile from './OptionsTile'
function calculateCreditScore(reportVars) {
  let score = 1000;

  score -= reportVars.inquiries.length * 10;
  let totalPayments = Math.max(
    1,
    reportVars.accounts.reduce((acc, c) => acc + c.payments.length, 0)
  );
  let onTimePayments = Math.max(
    1,
    reportVars.accounts.reduce(
      (acc, c) =>
        acc + c.payments.reduce((acc, c) => (acc + c === 0 ? 1 : 0), 0),
      0
    )
  );
  return score * (onTimePayments / totalPayments);
}

function NewUserView({ reportVars, user, refresh }) {

  return (reportVars && reportVars.newUser && !reportVars.businessUser) ? (<NewUserDashboard />) : reportVars && user ? (
    <Flex direction="column" w="100%">
      <Flex w="100%" mt={100} ml={50}>
        <Flex direction="column" align="left">
          <Heading size={"3xl"} color="white">
            Welcome, {user.name.split(" ")[0]}.
          </Heading>
          <Heading color="white" size="lg" fontWeight="thin" ml={2} mt={5}>
            {" "}
            {reportVars.businessUser
              ? "Build a reputation, grow your business."
              : reportVars.newUser
              ? "Start exploring ways to build a good credit profile"
              : reportVars.badUser
              ? "Regain control of your finances, go to Tasks to find out more"
              : "Make use of your great credit score"}
          </Heading>
        </Flex>
        <Spacer />
        <Button
          mt={0}
          bg={"blue.900"}
          color={"white"}
          fontWeight="bold"
          _hover={{
            bg: "blue.500",
          }}
          borderRadius={50}
          p={6}
          mr={100}
          w={150}
          onClick={() => refresh()}
        >
          Refresh
        </Button>
      </Flex>
      <Flex w="100%" align="center" ml={70} mt={"150px"} >
        <Center w="80%">
          <HStack spacing={10}>
            <OptionsTile title="Upload Invoice" image={Upload} />
            <OptionsTile title="Browse Accounting Data" image={Search}/>
            <OptionsTile title="Your Applications" image={Files} />
          </HStack>
        </Center>
      </Flex>
    </Flex>
  ) : null;
}

function ReturningUserView({ reportVars, user, refresh }) {
  return reportVars && user ? (
    <Flex direction="column" w="100%">
      <Flex w="100%" mt={100} ml={50}>
        <Flex direction="column" align="left">
          <Heading size={"3xl"} color="white">
            Welcome back, {user.name.split(" ")[0]}.
          </Heading>
          <Heading color="white" size="lg" fontWeight="thin" ml={2} mt={5}>
            {" "}
            Here are some highlights from your last credit report.
          </Heading>
        </Flex>
        <Spacer />
        <Button
          mt={0}
          bg={"blue.900"}
          color={"white"}
          fontWeight="bold"
          _hover={{
            bg: "blue.500",
          }}
          borderRadius={50}
          p={6}
          mr={100}
          w={150}
          onClick={() => refresh()}
        >
          Refresh
        </Button>
      </Flex>
      <Flex w="100%" align="center" ml={50} mt={"100px"}>
        <Center w="80%">
          <Grid
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={20}
          >
            <GridItem rowSpan={1} colSpan={1}>
              <MetricTile
                subtitle="Credit Score"
                stat={Math.floor(calculateCreditScore(reportVars))}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <MetricTile
                subtitle="Profile Inquiries"
                stat={reportVars.inquiries.length}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <MetricTile
                subtitle="Credit Account Balance"
                stat={reportVars.accounts.reduce(
                  (acc, cval) => acc + parseInt(cval.balance),
                  0
                )}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <MetricTile
                subtitle="Open Credit Accounts"
                stat={reportVars.accounts.reduce(
                  (acc, cval) => (acc + cval.dateClosed == 0 ? 1 : 0),
                  0
                )}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <MetricTile
                subtitle="Closed Credit Accounts"
                stat={reportVars.accounts.reduce(
                  (acc, cval) => (acc + cval.dateClosed == 0 ? 0 : 1),
                  0
                )}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <MetricTile
                subtitle="Total Credit Accounts"
                stat={reportVars.accounts.length}
              />
            </GridItem>
          </Grid>
          <HStack spacing={5}></HStack>
        </Center>
      </Flex>
    </Flex>
  ) : null;
}

export default function DashboardPanel() {
  const { user, reportVars, refresh } = useRHBChain();
  if (!reportVars) return null;
  const score = calculateCreditScore(reportVars);
  const newUser = score === 1000;

  return reportVars && user ? (
    newUser ? (
      <NewUserView reportVars={reportVars} user={user} refresh={refresh} />
    ) : (
      <ReturningUserView
        reportVars={reportVars}
        user={user}
        refresh={refresh}
      />
    )
  ) : null;
}
