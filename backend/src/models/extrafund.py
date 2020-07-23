from sqlalchemy.exc import SQLAlchemyError

from database import db


class ExtrafundModel(db.Model):
    __tablename__ = "extrafunds"

    id = db.Column(db.Integer, primary_key=True)
    mmk_amount = db.Column(db.Float())
    transfer_id = db.Column(db.Integer, db.ForeignKey("transfers.id"), nullable=False)

    def __init__(self, mmk_amount: float, transfer_id: int ) -> None:
        self.mmk_amount = mmk_amount
        self.transfer_id = transfer_id

    def __repr__(self):
        return f"<Extrafund for transfer_id {self.transfer_id}>"

    @staticmethod
    def create_extra_fund(new_extra_fund) -> bool:
        """
        create new extra fund for yen mmk price
        :param new_extra_fund:
        :return: bool
        """
        try:
            db.session.add(new_extra_fund)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            # to put log
            return False

