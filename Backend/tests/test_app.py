import pytest

from app import app

RICE = dict(Nitrogen=90, Phosporus=42, Potassium=43, Temperature=20.88, Humidity=82.0, ph=6.5, Rainfall=202.9)


@pytest.fixture
def client():
    return app.test_client()


def test_predict_is_registered(client):
    assert client.post("/predict", data=RICE).status_code == 200


def test_predict_returns_expected_crop(client):
    assert client.post("/predict", data=RICE).get_json()["result"].startswith("Rice")
