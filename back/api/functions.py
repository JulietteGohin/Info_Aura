def edit_city_list(np_city_list):
    city_list = np_city_list.tolist()
    rep = []
    for i, city in enumerate(city_list):
        rep.append({"id": i, "nom": city, "code_postal": "code_postal_inconnu"})
        return rep
