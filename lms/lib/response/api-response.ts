import { NextResponse } from "next/server";

interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export const ApiSuccess = <T>(
  message: string,
  data?: T,
  status: number = 200,
) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    } satisfies ApiResponse<T>,
    { status },
  );
};

export const ApiError = (
  message: string,
  status: number = 500,
  error?: unknown,
) => {
  return NextResponse.json(
    {
      success: false,
      message,
      error,
    } satisfies ApiResponse,
    { status },
  );
};
