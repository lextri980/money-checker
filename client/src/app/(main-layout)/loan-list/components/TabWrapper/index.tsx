"use client";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import FormInput from "@/components/FormInput";
import Icon from "@/components/Icon";
import { useClientCookie, useRoute } from "@/hooks";
import { LoanActions } from "@/store/loanStore/loan.reducer";
import { TransformDataUtil } from "@/utils";
import {
  faLayerGroup,
  faMagnifyingGlass,
  faMagnifyingGlassChart,
} from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tab, Tabs } from "@nextui-org/react";
import { Key } from "@react-types/shared";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import DetailTab from "../DetailTab";
import TotalTab from "../TotalTab";
import { createLoanSchema, filterSchema } from "./schema";
import "./style.scss";
import { UserLoanActions } from "@/store/userLoanStore/userLoan.reducer";
import { toast } from "react-toastify";

export default function TabWrapper() {
  const route = useRoute();
  const dispatch = useDispatch();
  const inSession = useClientCookie("inSession");
  const [selectedTab, setSelectedTab] = useState<Key>("detail");
  const [createLoanDialog, setCreateLoanDialog] = useState(true);

  /**
   * @form - Filter form
   */
  const { control: filterControl } = useForm({
    resolver: yupResolver(filterSchema),
  });

  /**
   * @form - Create loan form
   */
  const { control: createLoanControl } = useForm({
    resolver: yupResolver(createLoanSchema),
  });

  /**
   * @effect - Set selected tab to detail if user is in session
   */
  useEffect(() => {
    if (TransformDataUtil.stringToBoolean(inSession) === true) {
      setSelectedTab("detail");
    }
  }, [inSession]);

  /**
   * @effect - Get loan list
   */
  useEffect(() => {
    dispatch(
      LoanActions.getLoanListRequest({
        query: TransformDataUtil.getQueryString(route.query),
      })
    );
    dispatch(UserLoanActions.getUserLoanListRequest());
  }, []);

  /**
   * Handle change tab
   * @param key - Key of tab
   */
  const handleChangeTab = (key: Key) => {
    setSelectedTab(key);
  };

  /**
   * Toggle create loan dialog
   * @param isOpen - Whether to open or close the dialog
   */
  const toggleCreateLoanDialog = (isOpen: boolean) => {
    setCreateLoanDialog(isOpen);
  };

  /**
   * Handle create loan
   */
  const handleCreateLoan = () => {
    toast.error('Wrong');
  };

  return (
    <section className="loan-list-page__tab-wrapper-container">
      <div className="search-section">
        <div className="search-name-section w-1/4">
          <FormInput
            control={filterControl}
            name="search"
            placeholder="Search your name"
            variant="bordered"
          />
          <Icon className="search-icon" icon={faMagnifyingGlass} />
        </div>
        <FormInput
          control={filterControl}
          type="date-range"
          name="date-range"
          className="max-w-[250px]"
          variant="bordered"
          isDisabled={inSession === "false" || !inSession}
        />
        <Button
          className="black-bg font-semibold"
          onClick={() => toggleCreateLoanDialog(true)}
        >
          Create loan
        </Button>
      </div>
      <Tabs
        aria-label="Options"
        size="lg"
        selectedKey={selectedTab}
        onSelectionChange={handleChangeTab}
      >
        <Tab
          key="total"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon={faLayerGroup} />
              <span>Total</span>
            </div>
          }
        >
          <TotalTab />
        </Tab>
        <Tab
          key="detail"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon={faMagnifyingGlassChart} />
              <span>Detail</span>
            </div>
          }
        >
          <DetailTab />
        </Tab>
      </Tabs>

      {/* DIALOG SECTION */}
      <Dialog
        cln="loan-list-page__tab-wrapper-container_create-loan-dialog"
        isOpen={createLoanDialog}
        header="Create loans"
        footer={
          <>
            <Button onClick={() => toggleCreateLoanDialog(false)}>
              Cancel
            </Button>
            <Button className="black-bg" onClick={handleCreateLoan}>Create</Button>
          </>
        }
      >
        <div className="create-loan-dialog-body">
          <div className="form-group">
            <label htmlFor="userLoanId">Username</label>
            <FormInput
              control={createLoanControl}
              type="select"
              name="userLoanId"
              variant="bordered"
              options={[
                { label: "Select", value: "select" },
                { label: "Select 2", value: "select2" },
              ]}
            />
          </div>
        </div>
      </Dialog>
    </section>
  );
}
