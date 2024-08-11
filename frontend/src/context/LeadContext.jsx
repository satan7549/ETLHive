import React, { createContext, useState, useContext } from "react";
import api, { baseURL } from "../utils/api";

const LeadContext = createContext();

const initialState = {
  leads: [],
  error: null,
  loading: false,
  leadCreated: false,
  leadUpdated: false,
  leadDeleted: false,
  searchQuery: "",
  sortKey: "name",
  sortOrder: "asc",
};

export const LeadProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // Function to create a new lead
  const createLead = async (lead) => {
    const newObj = {
      ...lead,
      email: lead.email === "" ? undefined : lead.email,
      number: lead.number === "" ? undefined : lead.number,
      product:
        lead.product.length <= 1 && lead.product[0] === "" ? [] : lead.product,
    };
    setState((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));
    try {
      const response = await api.post(`${baseURL}/lead`, newObj);

      setState((prevState) => ({
        ...prevState,
        leads: [...prevState.leads, response.data.data],
        loading: false,
        leadCreated: true,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Create lead failed";
      setState((prevState) => ({
        ...prevState,
        error: errorMessage,
        loading: false,
        leadCreated: false,
      }));
    }
  };

  // Function to update a lead
  const updateLead = async (id, updatedLead) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));
    try {
      const response = await api.patch(`${baseURL}/lead/${id}`, updatedLead);

      setState((prevState) => ({
        ...prevState,
        leads: prevState.leads.map((lead) => {
          return lead._id === id ? response.data.data : lead;
        }),
        loading: false,
        leadUpdated: true,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Update lead failed";
      setState((prevState) => ({
        ...prevState,
        error: errorMessage,
        loading: false,
        leadUpdated: false,
      }));
    }
  };

  // Function to delete a lead
  const deleteLead = async (id) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));
    try {
      await api.delete(`${baseURL}/lead/${id}`);
      setState((prevState) => ({
        ...prevState,
        leads: prevState.leads.filter((lead) => lead._id !== id),
        loading: false,
        leadDeleted: true,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Delete lead failed";
      setState((prevState) => ({
        ...prevState,
        error: errorMessage,
        loading: false,
        leadDeleted: false,
      }));
    }
  };

  // Function to search leads
  const searchLeads = async (query) => {
    setState((prevState) => ({
      ...prevState,
      searchQuery: query,
    }));
    await fetchLeads(query, state.sortOrder);
  };

  // Function to sort leads
  const sortLeads = (key) => {
    const newSortOrder = state.sortOrder === "asc" ? "desc" : "asc"; // Toggle sort order
    setState((prevState) => ({
      ...prevState,
      sortKey: key,
      sortOrder: newSortOrder,
    }));
    fetchLeads(state.searchQuery, newSortOrder);
  };

  const fetchLeads = async (searchQuery = "", sortOrder = "asc") => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    try {
      const response = await api.get(`${baseURL}/lead`, {
        params: {
          search: searchQuery,
          sortOrder,
        },
      });
      setState((prevState) => ({
        ...prevState,
        leads: response.data.data,
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Fetch leads failed";
      setState((prevState) => ({
        ...prevState,
        error: errorMessage,
        loading: false,
      }));
    }
  };

  return (
    <LeadContext.Provider
      value={{
        state,
        fetchLeads,
        createLead,
        updateLead,
        deleteLead,
        searchLeads,
        sortLeads,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLead = () => useContext(LeadContext);
