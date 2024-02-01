export type SolicitacaoHoraExtraProps = {
  funcionario_id: number;
  solicitante_id: number;
  data_solicitacao: Date;
  data_extra: Date;
  horas_extras: Date;
  observacao: string;
  autorizado_por: string;
  data_autorizacao: Date;
  status_solicitacao_id: number;

  [key: string]: string | number | Date;
};

export default class SolicitacaoHoraExtraEntity {
    public props: SolicitacaoHoraExtraProps;

    constructor(props: SolicitacaoHoraExtraProps) {
        this.props = {
            ...props,
        };
    }
}
