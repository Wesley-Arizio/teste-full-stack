import apiClient from "./axiosInstance";
import axios from "axios";
import { User } from "./interfaces";

import { format } from "date-fns";

interface BaseApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

type CreateUserResponse = BaseApiResponse<User>;

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
      data: response.data.user,
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

export type GetUsersResponse = BaseApiResponse<User[]>;

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
      };
    }

    return {
      success: true,
      data: response.data.users,
    };
  } catch (error) {
    return {
      success: false,
      message: `A server error occurred. Please try again later.`,
    };
  }
}

export async function getUser(id: string): Promise<BaseApiResponse<User>> {
  try {
    const response = await apiClient.get(`/user/${id}`);

    if (response.status != 200) {
      return {
        success: false,
        message: response.data.message ?? "Internal Server Error",
      };
    }

    return {
      success: true,
      data: response.data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: `A server error occurred. Please try again later.`,
    };
  }
}

export interface IUpdateUser {
  id: string;
  name: string;
  address: string;
}

export async function updateUser({
  id,
  name,
  address,
}: IUpdateUser): Promise<BaseApiResponse<User>> {
  try {
    const response = await apiClient.put(`/user/${id}/edit`, {
      user: {
        name,
        address,
      },
    });
    if (response.status != 200) {
      return {
        success: false,
        message: response.data.message || "",
      };
    }
    return {
      success: true,
      data: response.data.user,
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
