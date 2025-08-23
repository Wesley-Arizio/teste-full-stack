import apiClient from "./axiosInstance";
import axios from "axios";
import { User } from "./interfaces";

import { format } from "date-fns";

interface CreateUserResponse {
  success?: boolean;
  message?: string;
  user?: User;
}

export async function createUser(
  user: Omit<User, "id">
): Promise<CreateUserResponse> {
  try {
    const response = await apiClient.post("/user/create", {
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        birthdate: user.birthdate ? format(user.birthdate, "yyyy-MM-dd") : null,
      },
    });
    if (response.status != 201) {
      return {
        success: false,
        message: response.data.message || "",
      };
    }
    return {
      success: true,
      user: response.data.user,
    };
  } catch (error) {
    let message = "Internal Server Error";
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            const { error: isError, message: msg } = error.response.data;

            if (isError && msg) {
              const [errorMessage] = msg.fieldErrors.user;
              message = errorMessage;
            }
            break;

          case 409:
            message = "User with this email already exists";
            break;

          default:
            message = `A server error occurred (status ${error.response.status}). Please try again later.`;
            break;
        }
      }
    }
    return {
      success: false,
      message,
    };
  }
}

export interface GetUsersPagination {
  offset: number;
  limit: number;
}

export interface GetUsersResponse {
  success?: boolean;
  message?: string;
  users: User[];
}

export async function getUsers({
  offset,
  limit,
}: GetUsersPagination): Promise<GetUsersResponse> {
  try {
    const response = await apiClient.get("/user/list");

    if (response.status != 200) {
      return {
        success: false,
        message: response.data.message ?? "Internal Server Error",
        users: [],
      };
    }

    return {
      success: true,
      users: response.data.users,
    };
  } catch (error) {
    return {
      success: false,
      message: `A server error occurred. Please try again later.`,
      users: [],
    };
  }
}
