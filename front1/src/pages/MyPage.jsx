import { useState, useEffect } from "react";
import apiClient from "../apiClient";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";
import TicketList from "../components/TicketList.jsx";
import profileIMG from "../assets/img/profile.png";
import "../style/MyPage.css";

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [addressInput, setAddressInput] = useState("");

  const navigate = useNavigate();

  const adminBtn = () => navigate("/performances/edit");

  const formatDate = (localDateTimeString) => {
    const date = new Date(localDateTimeString);

    const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    let formattedDate = dateFormatter.format(date);
    return formattedDate;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get("/api/users/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // ✅ 여기서 userInfo를 localStorage에 저장해!
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setUserInfo(response.data);
        setNameInput(response.data.name);
        setAddressInput(response.data.address || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();

  }, [navigate]);

  const updateUserInfo = async () => {
    if (!nameInput) {
      alert("빈칸 확인");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await apiClient.put(
          "/api/users/update",
          {
            name: nameInput,
            address: addressInput,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      alert("사용자 정보가 성공적으로 수정되었습니다.");
      setUserInfo({
        ...userInfo,
        name: nameInput,
        address: addressInput,
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const nameChange = (event) => {
    setNameInput(event.target.value);
  };

  const addressChange = (event) => {
    setAddressInput(event.target.value);
  };

  const editUserInfo = () => {
    if (isEditing) {
      setNameInput(userInfo.name);
      setAddressInput(userInfo.address);
    }
    setIsEditing(!isEditing);
  };

  const deleteUser = async () => {
    const confirmed = window.confirm("탈퇴 하시겠습니까?");

    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      await apiClient.delete("/api/users/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("사용자 정보가 삭제되었습니다.");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className="mypage-container">
        {userInfo ? (
            <div className="mypage-content">
              <div className="mypage-left-section">
                <div className="mypage-profile-image-section">
                  <div className="mypage-profile-image-container">
                    <img
                        src={profileIMG}
                        alt="Profile"
                        className="mypage-profile-image"
                    />
                  </div>
                  <p className="mypage-profile-name">{userInfo.name} 님</p>
                </div>

                <div className="mypage-action-buttons">
                  <button
                      onClick={editUserInfo}
                      className="mypage-btn-edit mypage-button"
                  >
                    정보 수정
                  </button>
                  {userInfo.role === "ADMIN" && (
                      <button
                          onClick={adminBtn}
                          className="mypage-btn-edit mypage-button">
                        공연 등록
                      </button>
                  )}
                </div>
                <div className="mypage-calendar">
                  <Calendar/>
                </div>
              </div>

              <div className="mypage-right-section">
                <h1 className="mypage-index">마이페이지</h1>
                <table className="mypage-user-info-table">
                  <thead>
                  <tr>
                    <th
                        colSpan="2"
                        style={{
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                    >
                      내 정보
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>이메일</td>
                    <td>{userInfo.email}</td>
                  </tr>
                  <tr>
                    <td>이름</td>
                    <td>
                      {isEditing ? (
                          <input
                              type="text"
                              value={nameInput}
                              onChange={nameChange}
                              className="mypage-input-field"
                          />
                      ) : (
                          userInfo.name
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>주소</td>
                    <td>
                      {isEditing ? (
                          <input
                              type="text"
                              value={addressInput}
                              onChange={addressChange}
                              className="mypage-input-field"
                          />
                      ) : userInfo.address ? (
                          userInfo.address
                      ) : (
                          <span className="mypage-address-prompt">
                        주소를 등록해 주세요
                      </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>가입일</td>
                    <td>{formatDate(userInfo.createdAt)}</td>
                  </tr>
                  <tr>
                    <td>권한</td>
                    <td>{userInfo.role}</td>
                  </tr>
                  </tbody>
                </table>

                {isEditing && (
                    <div className="mypage-edit-buttons">
                      <button
                          onClick={updateUserInfo}
                          className="mypage-btn-save mypage-button"
                      >
                        저장
                      </button>
                      <button
                          onClick={deleteUser}
                          className="mypage-btn-delete mypage-button"
                      >
                        탈퇴
                      </button>
                    </div>
                )}
                <h1 className="mypage-index">예매 내역</h1>
                <TicketList userId={userInfo.id} />
              </div>
            </div>
        ) : (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
        )}
      </div>
  );
}

export default MyPage;