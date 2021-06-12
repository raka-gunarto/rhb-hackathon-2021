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
import { ArrowDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import MetricTile from "./MetricTile";
import { useRHBChain } from "../hooks/RHBProvider";

function calculateCreditScore(reportVars) {
  let score = 1000;
  for
}

export default function DashboardPanel() {
  const { user, reportVars, refresh } = useRHBChain();

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
        >
          Refresh
        </Button>
      </Flex>
      <Flex w="100%" align="center" ml={50} mt={"30"}>
        <Center w="80%">
          <Grid
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={10}
          >
            <GridItem rowSpan={1} colSpan={1}>
              <MetricTile subtitle="Credit Score" stat={250} />
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
                  (acc, cval) => acc + cval.balance,
                  0
                )}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <MetricTile subtitle="Open Credit Accounts" 
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
            <GridItem rowSpan={1} colSpan={3}>
              <Center
                h={150}
                mt={10}
                borderRadius={50}
                bg={"gray.900"}
                _hover={{ bg: "blue.900" }}
              >
                <VStack spacing={3}>
                  <Heading color="white">Get Insights</Heading>
                  <ArrowDownIcon color="white" w={10} h={10} />
                </VStack>
              </Center>
            </GridItem>
          </Grid>
          <HStack spacing={5}></HStack>
        </Center>
      </Flex>
    </Flex>
  ) : null;
}
