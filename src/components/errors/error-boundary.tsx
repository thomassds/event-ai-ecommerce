"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import {
  XCircleIcon,
  ArrowCounterClockwiseIcon,
  HouseIcon,
} from "@phosphor-icons/react/ssr";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  private retryCount = 0;
  private maxRetries = 3;

  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.props.onError?.(error, errorInfo);

    if (process.env.NODE_ENV === "production") {
    }
  }

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.setState({ hasError: false, error: null });
    }
  };

  private handleReset = () => {
    this.retryCount = 0;
    this.setState({ hasError: false, error: null });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 text-red-500">
              <XCircleIcon size={64} weight="duotone" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Algo deu errado
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Encontramos um problema inesperado. Nossa equipe foi notificada e
              está trabalhando para corrigi-lo.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="text-xs bg-gray-100 p-3 rounded text-red-600 overflow-auto max-h-32">
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {this.retryCount < this.maxRetries && (
                <button
                  onClick={this.handleRetry}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <ArrowCounterClockwiseIcon size={16} />
                  Tentar novamente
                </button>
              )}

              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Recarregar componente
              </button>

              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <HouseIcon size={16} />
                Voltar ao início
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function SearchErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="text-center py-8">
          <XCircleIcon size={48} className="mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Erro na busca
          </h3>
          <p className="text-gray-600 mb-4">
            Não foi possível carregar os resultados da busca no momento.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            Recarregar página
          </button>
        </div>
      }
      onError={(error, errorInfo) => {
        console.error("Search error:", error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export function TicketSelectorErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="border border-red-200 bg-red-50 rounded-lg p-6 text-center">
          <XCircleIcon size={32} className="mx-auto text-red-500 mb-3" />
          <h4 className="font-medium text-red-800 mb-2">
            Erro ao carregar ingressos
          </h4>
          <p className="text-red-600 text-sm">
            Não foi possível carregar as opções de ingressos. Tente recarregar a
            página.
          </p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function OrderSummaryErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="border border-orange-200 bg-orange-50 rounded-lg p-4 text-center">
          <p className="text-orange-700 text-sm">
            Erro ao carregar resumo do pedido
          </p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function DateSelectorErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="text-center py-4">
          <p className="text-gray-600 text-sm">
            Erro ao carregar datas disponíveis
          </p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function SafeComponent({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
}
