import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./ListOfOfficers.module.css";
import employees from "../../assets/icons/employeesIcon.svg";
import SecondaryButton from "../../components/SecondaryButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import Message from "../../components/Message/Message";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActionsOfficer } from "../../hooks/useActions";

const ListOfOfficers: React.VFC = () => {
  const { officers, isLoading, messageOfficer } = useTypedSelector(
    (state) => state.officersReducer
  );
  const { getAllOfficers, deleteOfficer, handleClickMessageButton } =
    useActionsOfficer();

  const navigate = useNavigate();

  useEffect(() => {
    getAllOfficers();
  }, []);

  const handleRowClick = (
    id: string | number,
    e: React.MouseEvent<HTMLTableRowElement>
  ) => {
    navigate(`/officers/${id}`);
    e.preventDefault();
  };

  const handleButtonClick = (
    id: string | number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    deleteOfficer(id);
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
          {messageOfficer ? (
            <Message message={messageOfficer} onClick={handleClickMessage} />
          ) : (
            <div className="wrapper">
              <table className="table table-hover" id={"listOfOfficersTable"}>
                <thead>
                  <tr>
                    <th scope="col">
                      <img src={employees} alt={"Employee"} />
                    </th>
                    <th>ФИО</th>
                    <th className={css.th3}>E-mail</th>
                    <th className={css.th4}>Одобрен</th>
                  </tr>
                </thead>
                <tbody>
                  {officers &&
                    officers.map((item, index) => {
                      return (
                        <tr
                          className="cursor"
                          key={item._id}
                          onClick={(e) => handleRowClick(item._id, e)}
                        >
                          <th scope="row" className={css.cell1}>
                            {index + 1}
                          </th>
                          <td className={css.cell2}>
                            {!item.firstName && !item.lastName
                              ? `Имя и фамилия не введены`
                              : `${
                                  item.firstName && item.lastName
                                    ? `${item.firstName} ${item.lastName}`
                                    : `${item.firstName || item.lastName}`
                                }`}
                          </td>
                          <td className={css.cell3}>{item.email}</td>
                          <td className={css.cell4}>
                            <div
                              className={`form-check form-switch ${css.switchInput}`}
                            >
                              <input
                                className="form-check-input checkboxInput"
                                type="checkbox"
                                name={"approved"}
                                defaultChecked={item.approved}
                              />
                            </div>
                          </td>
                          <th className={css.cell5}>
                            <SecondaryButton
                              title={"Удалить"}
                              type={"button"}
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
export default ListOfOfficers;
