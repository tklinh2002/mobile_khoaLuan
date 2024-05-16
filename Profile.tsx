import { W3mButton, Web3Modal } from "@web3modal/wagmi-react-native";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEnsName,
  useContractRead,
  useContractWrite,
} from "wagmi";
import { abi } from "./abi";
const Profile = () => {
  const { address, isConnected, connector: activeConnector } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const balance = useBalance({ address: address });
  const { disconnect } = useDisconnect();

  // State variables for testing write methods
  const [id, setId] = useState(1); // Replace with desired ID for testing
  const [signature, setSignature] = useState("0000000000000000"); // Replace with a valid signature
  const [title, setTitle] = useState("Sample Contract");
  const [description, setDescription] = useState("Sample Description");
  const [bids, setBids] = useState(0); // Sample bid array
  const [jobId, setJobId] = useState(2); // Replace with a valid job ID
  const freelancerId = 1; // Replace with a freelancer address
  const clientId = 1; // Replace with a client address
  const reason = "Sample cancellation reason"; // Reason for canceling a contract
  const currentJobId = 3; // Replace with a valid job ID for getting job info

  // Contract interactions (write methods)
  const acceptContract = useContractWrite({
    address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e", // Replace with your contract address
    abi,
    functionName: "acceptContract",
    args: [id, signature],
  } as any);
  const test = useContractWrite({});
  const cancelContract = useContractWrite({
    address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
    abi,
    functionName: "cancelContract",
    args: [id, reason],
  } as any);

  const createContract = useContractWrite({
    address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
    abi,
    functionName: "createContract",
    args: [title, description, signature, 0, jobId, freelancerId, clientId],
    onError: (error) => {
      if (error.message.includes("User rejected the transaction")) {
        console.log("User rejected contract creation.");
      } else {
        console.error("Error creating contract:", error);
        // Handle other errors (e.g., insufficient funds, contract logic errors)
      }
    },
  } as any);

  const finalizeContract = useContractWrite({
    address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
    abi,
    functionName: "finalizeContract",
    args: [id],
  } as any);

  const reportCompletion = useContractWrite({
    address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
    abi,
    functionName: "reportCompletion",
    args: [id],
  } as any);
  const getJobInfoByCurrentJobId = useContractRead({
    abi,
    address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
    functionName: "getJobInfoByCurrentJobId",
    args: [6],
    select(data) {
      return {
        contract_id: Number(data[0]),
        title: data[1],
        description: data[2],
        signature_freelancer: data[3],
        signature_client: data[4],
        bids: Number(data[5]),
        status: data[6],
        address_client: data[7],
        address_freelancer: data[8],
        freelancer_id: Number(data[9]),
        Client_id: Number(data[10]),
      };
    },
  });

  const getContractsByFreelancerId = useContractRead({
    abi,
    address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
    functionName: "getContractsByFreelancerId",
    args: [1],
    select(data) {
      // Handle potential BigInts in the data
      const processedData = (data as any[])?.map((contract) => {
        const processedContract = { ...contract }; // Clone the contract object
        for (const key in processedContract) {
          // Check if the value is a BigInt and convert to string
          if (typeof processedContract[key] === "bigint") {
            processedContract[key] = processedContract[key].toString();
          }
        }
        return processedContract;
      });
      return JSON.stringify(processedData);
    },
  });
  const getContractDetailByIndex = useContractRead({
    abi,
    address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
    functionName: "getContractDetailByIndex",
    args: [1],
    select(data: any) {
      return {
        title: data.title,
        bids: Number(data.bids),
        description: data.description,
        jobIdcurent: Number(data.jobIdcurent),
        client_address: data.client,
        client_id: Number(data.clientId),
        signatureClient: data.signatureC,
        freelancer_address: data.freelancer,
        freelancer_id: Number(data.freelancerId),
        signatureFreelancer: data.signatureF,
        status: Number(data.status),
        cancelReason: data.cancelReason,
      };
      // Handle potential BigInts in the data
      // const processedData = (data as any[])?.map((contract) => {
      //   const processedContract = { ...contract }; // Clone the contract object
      //   for (const key in processedContract) {
      //     // Check if the value is a BigInt and convert to string
      //     if (typeof processedContract[key] === "bigint") {
      //       processedContract[key] = processedContract[key].toString();
      //     }
      //   }
      //   return processedContract;
      // });
      // return JSON.stringify(processedData);
    },
  });
  const getContractsByClientId = useContractRead({
    abi,
    address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
    functionName: "getContractsByClientId",
    args: [9],
    select(data) {
      // Handle potential BigInts in the data
      const processedData = (data as any[])?.map((contract) => {
        const processedContract = { ...contract }; // Clone the contract object
        for (const key in processedContract) {
          if (typeof processedContract[key] === "bigint") {
            processedContract[key] = processedContract[key].toString();
          }
        }
        return processedContract;
      });
      return JSON.stringify(processedData);
    },
  });
  return (
    <ScrollView>
      <View style={styles.container}>
        <Web3Modal />
        {isConnected ? (
          <>
            <Text>Connected to {ensName ?? address}</Text>
            <Text>Balance: {balance.data?.formatted}</Text>
            <Button title="Disconnect" onPress={() => disconnect()} />

            {/* Test buttons for write methods */}
            <View>
              <Button title="Accept Contract" onPress={() => acceptContract} />

              {acceptContract.isLoading && <Text>Accepting contract...</Text>}
              {acceptContract.error && (
                <Text>
                  Error accepting contract: {acceptContract.error.message}
                </Text>
              )}

              <Button title="Cancel Contract" onPress={() => cancelContract} />
              {cancelContract.isLoading && <Text>Canceling contract...</Text>}
              {cancelContract.error && (
                <Text>
                  Error canceling contract: {cancelContract.error.message}
                </Text>
              )}

              <Button
                title="Create Contract"
                disabled={createContract.isLoading}
                onPress={() => createContract.write()}
              />
              <Text>{createContract.isLoading}</Text>
              {createContract.isLoading && <Text>Creating contract...</Text>}

              <Button
                title="Finalize Contract"
                disabled={finalizeContract.isLoading}
                onPress={() => finalizeContract}
              />
              {finalizeContract.isLoading && (
                <Text>Finalizing contract...</Text>
              )}
              {finalizeContract.error && (
                <Text>
                  Error finalizing contract: {finalizeContract.error.message}
                </Text>
              )}

              <Button
                title="Report Completion"
                disabled={reportCompletion.isLoading}
                onPress={() => reportCompletion}
              />
              {reportCompletion.isLoading && (
                <Text>Reporting completion...</Text>
              )}
              {reportCompletion.error && (
                <Text>
                  Error reporting completion: {reportCompletion.error.message}
                </Text>
              )}
            </View>

            {/* Contract call results (if any) */}
            {acceptContract.data && (
              <Text>
                Contract accepted: {JSON.stringify(acceptContract.data)}
              </Text>
            )}
            {cancelContract.data && (
              <Text>
                Contract canceled: {JSON.stringify(cancelContract.data)}
              </Text>
            )}

            {finalizeContract.data && (
              <Text>
                Contract finalized: {JSON.stringify(finalizeContract.data)}
              </Text>
            )}
            {reportCompletion.data && (
              <Text>
                Completion reported: {JSON.stringify(reportCompletion.data)}
              </Text>
            )}
            {/* Job information */}

            {getContractsByFreelancerId.data && (
              <View>
                {getContractsByFreelancerId.isLoading && (
                  <Text>Loading contracts...</Text>
                )}
                {getContractsByFreelancerId.isError && (
                  <Text>Error: {getContractsByFreelancerId.error.message}</Text>
                )}

                {/* Data available and parsing if necessary */}
                {typeof getContractsByFreelancerId.data === "string" && (
                  <View>
                    {JSON.parse(getContractsByFreelancerId.data).map(
                      (contract) => (
                        <Text key={contract.id}>
                          id: {contract.id}
                          title: {contract.title}
                          status: {contract.status}
                          jobId: {contract.jobIdcurent}
                        </Text>
                      )
                    )}
                  </View>
                )}
                {typeof getContractsByClientId.data === "string" && (
                  <View>
                    {JSON.parse(getContractsByClientId.data).map((contract) => (
                      <Text key={contract.id}>
                        {}
                        id: {contract.id}
                        title: {contract.title}
                        status: {contract.status}
                        jobId: {contract.jobIdcurent}
                      </Text>
                    ))}
                  </View>
                )}
                {getContractDetailByIndex.data && (
                  <View>
                    <Text>
                      getContractDetailByIndex:
                      {JSON.stringify(getContractDetailByIndex.data)}
                    </Text>
                  </View>
                )}
                {/* {
        <Text>
          getJobInfoByCurrentJobId: {JSON.stringify(getJobInfoByCurrentJobId.data)}
        </Text>
      } */}
              </View>
            )}
          </>
        ) : (
          <>
            <W3mButton balance="show" />
          </>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Profile;
