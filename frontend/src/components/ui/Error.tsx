import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { HTMLAttributes } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Error<T extends HTMLDivElement>({ children }: HTMLAttributes<T>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              <p>There was an error!</p>
              <button onClick={() => resetErrorBoundary()}>Try Again</button>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
