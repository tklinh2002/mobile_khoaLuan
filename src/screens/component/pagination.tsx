import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
const PAGE_SIZE = 10;
const Panigation = ({setpage, length}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setpage(currentPage-1)
    console.log(currentPage-1)
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setpage(currentPage+1)
    console.log(currentPage+1)
  };
  return (
    <View style={styles.paginationContainer}>
      {/* Render pagination controls */}
      <TouchableOpacity
        style={[styles.paginationButton, { marginRight: 10 }]}
        onPress={goToPreviousPage}
        disabled={currentPage === 1}
      >
        <Text style={styles.paginationButtonText}>Previous</Text>
      </TouchableOpacity>
      <Text style={styles.paginationText}>
        Page {currentPage} of {totalPages}
      </Text>
      <TouchableOpacity
        style={styles.paginationButton}
        onPress={goToNextPage}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.paginationButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    width: 110,
    alignItems: "center",
  },
  paginationButtonText: {
    color: "white",
    fontSize: 16,
  },
  paginationText: {
    fontSize: 16,
    marginHorizontal: 10,
    textAlign: "center",
  },
});
export default Panigation;
