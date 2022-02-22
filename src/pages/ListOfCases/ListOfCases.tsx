import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./ListOfCases.module.css";
import LoadingSpinner from "src/components/LoadingSpinner";
import Message from "src/components/Message";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActionsCases } from "src/hooks/useActions";
import SecondaryButton from "src/components/SecondaryButton";
import { useTranslation } from "react-i18next";

const ListOfCases: React.VFC = () => {
  const { t } = useTranslation();

  const { cases, isLoading, messageCase } = useTypedSelector(
    (state) => state.casesReducer
  );
  const { getAllCases, deleteCase, handleClickMessageButton } =
    useActionsCases();

  const navigate = useNavigate();

  useEffect(() => {
    getAllCases();
  }, []);

  const handleRowClick = (
    id: string | number,
    e: React.MouseEvent<HTMLTableRowElement>
  ) => {
    navigate(`/cases/${id}`);
    e.stopPropagation();
  };

  const handleButtonClick = (
    id: string | number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    deleteCase(id);
    e.stopPropagation();
  };

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {messageCase ? (
            <Message message={messageCase} onClick={handleClickMessage} />
          ) : (
            <div className="wrapper">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("case.licenseNumber")}</th>
                    <th scope="col" className={css.th3}>
                      {t("case.type")}
                    </th>
                    <th scope="col" className={css.th4}>
                      {t("case.color")}
                    </th>
                    <th scope="col" className={css.th5}>
                      {t("case.description")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cases.map((item, index) => {
                    return (
                      <tr
                        className="cursor"
                        key={item._id}
                        onClick={(e) => handleRowClick(item._id, e)}
                      >
                        <th scope="row" className={css.cell1}>
                          {index + 1}
                        </th>

                        <td className={css.cell2}>{item.licenseNumber}</td>

                        <td className={css.cell3}>
                          {(item.type === "sport" &&
                            t("case.typeList.sport")) ||
                            (item.type === "general" &&
                              t("case.typeList.general"))}
                        </td>

                        <td className={css.cell4}>{item.color}</td>

                        <td className={css.cell5}>{item.description}</td>
                        <th className={css.cell6}>
                          <SecondaryButton
                            title={t("secondaryButton.title")}
                            type="button"
                            className="btn-sm"
                            onClick={(e) => handleButtonClick(item._id, e)}
                          />
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default ListOfCases;
