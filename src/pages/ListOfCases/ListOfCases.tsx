import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./ListOfCases.module.css";
import SecondaryButton from "../../components/SecondaryButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import Message from "../../components/Message/Message";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActionsCases } from "../../hooks/useActions";

const ListOfCases: React.FC = () => {
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
            <div className={"wrapper"}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Лицензионный номер</th>
                    <th scope="col" className={css.th3}>
                      Тип
                    </th>
                    <th scope="col" className={css.th4}>
                      Цвет
                    </th>
                    <th scope="col" className={css.th5}>
                      Описание
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
                          {(item.type === "sport" && "Sport") ||
                            (item.type === "general" && "General")}
                        </td>

                        <td className={css.cell4}>{item.color}</td>

                        <td className={css.cell5}>{item.description}</td>
                        <th className={css.cell6}>
                          <SecondaryButton
                            title={"Удалить"}
                            type={"button"}
                            className={"btn-sm"}
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
